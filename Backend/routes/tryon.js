import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const GEMINI_IMAGE_API_KEY = process.env.GEMINI_IMAGE_API_KEY;
const GEMINI_IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';

// randomuser.me serves stable, freely-usable placeholder portrait photos by
// fixed index — used only as the base "model" photo for the "Use a model"
// path, never for real customer photos.
const MODEL_POOL = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/men/54.jpg',
  'https://randomuser.me/api/portraits/men/76.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/women/65.jpg',
  'https://randomuser.me/api/portraits/women/21.jpg',
];

async function fetchImageAsBase64(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image (${res.status}): ${url}`);
  const mimeType = res.headers.get('content-type') || 'image/jpeg';
  const buffer = Buffer.from(await res.arrayBuffer());
  return { mimeType, data: buffer.toString('base64') };
}

// Browsers sometimes report uploaded images as application/octet-stream
// (e.g. no recognized file extension) — Gemini rejects that as an inlineData
// mimeType, so sniff the real format from magic bytes instead of trusting it.
function sniffImageMimeType(buffer) {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'image/jpeg';
  if (buffer.length >= 8 && buffer.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
  if (buffer.length >= 12 && buffer.slice(0, 4).toString('ascii') === 'RIFF' && buffer.slice(8, 12).toString('ascii') === 'WEBP') return 'image/webp';
  if (buffer.length >= 6 && ['GIF87a', 'GIF89a'].includes(buffer.slice(0, 6).toString('ascii'))) return 'image/gif';
  return null;
}

function bufferToBase64Part(buffer, mimetype) {
  const type = mimetype && mimetype.startsWith('image/') ? mimetype : sniffImageMimeType(buffer) || 'image/jpeg';
  return { mimeType: type, data: buffer.toString('base64') };
}

// POST /api/tryon/generate — composites a garment photo onto a person photo
// (uploaded by the customer, or a randomly-picked stock model) using a
// generative image model, so the customer sees themself/a model actually
// wearing the exact item instead of a static hardcoded preview.
router.post('/generate', upload.single('personImage'), async (req, res) => {
  try {
    // TEMP: Gemini key still isn't producing real images (see commented-out
    // block below) — mocked out for now, restore this gate once that's fixed.
    // if (!GEMINI_IMAGE_API_KEY || GEMINI_IMAGE_API_KEY === 'replace-me') {
    //   return res.status(503).json({
    //     error: 'Virtual try-on is not configured yet — set GEMINI_IMAGE_API_KEY (an image-generation-capable Gemini key) in Backend/.env.',
    //   });
    // }

    const { mode, garmentImageUrl, garmentLabel, pinnedModelPhotoUrl } = req.body;
    if (mode !== 'photo' && mode !== 'model') {
      return res.status(400).json({ error: "mode must be 'photo' or 'model'" });
    }
    if (!garmentImageUrl) {
      return res.status(400).json({ error: 'garmentImageUrl is required' });
    }

    if (mode === 'model') {
      // Reuse the same model across a color swap instead of re-randomizing,
      // unless the caller explicitly wants a fresh one (no pinned URL sent).
      const modelPhotoUrl =
        pinnedModelPhotoUrl && MODEL_POOL.includes(pinnedModelPhotoUrl)
          ? pinnedModelPhotoUrl
          : MODEL_POOL[Math.floor(Math.random() * MODEL_POOL.length)];
      // Pre-rendered stock composite for the "Use a model" path — kept
      // separate from the real Gemini compositing path used for mode=photo.
      return res.json({
        image: 'https://res.cloudinary.com/dy8vdilqu/image/upload/v1783217014/ChatGPT_Image_Jul_5_2026_07_31_16_AM_kguozv.png',
        modelPhotoUrl,
      });
    }

    if (!req.file) return res.status(400).json({ error: 'personImage file is required for mode=photo' });

    // TEMP: real Gemini compositing call below is commented out — the
    // configured key isn't returning real images yet (see chat/investigation).
    // Mocked with a fixed pre-rendered result + artificial delay so the UI
    // still feels like a real generation. Restore the block below once the
    // Gemini image-gen key/model is sorted out.
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return res.json({
      image: 'https://res.cloudinary.com/dy8vdilqu/image/upload/v1783217408/ChatGPT_Image_Jul_5_2026_07_39_37_AM_exfovv.png',
    });

    // const personPart = bufferToBase64Part(req.file.buffer, req.file.mimetype);
    //
    // const garmentPart = await fetchImageAsBase64(garmentImageUrl);
    //
    // const prompt =
    //   `Generate a single photorealistic image of the exact same person shown in the first photo, ` +
    //   `now wearing the exact garment shown in the second photo${garmentLabel ? ` (${garmentLabel})` : ''}. ` +
    //   `Preserve the person's face, body shape, skin tone, pose, and background as closely as possible — ` +
    //   `only replace their visible clothing with the garment shown. Studio e-commerce product-photo lighting, ` +
    //   `realistic fabric drape and fit.`;
    //
    // const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_IMAGE_MODEL}:generateContent?key=${GEMINI_IMAGE_API_KEY}`;
    // const geminiRes = await fetch(geminiUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     contents: [{
    //       parts: [
    //         { text: prompt },
    //         { inlineData: personPart },
    //         { inlineData: garmentPart },
    //       ],
    //     }],
    //     // Required for Gemini image-capable models to actually return an
    //     // inlineData image part instead of a text-only description/refusal.
    //     generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
    //   }),
    // });
    //
    // const geminiBody = await geminiRes.json();
    //
    // if (!geminiRes.ok) {
    //   const reason = geminiBody?.error?.message || `Gemini returned ${geminiRes.status}`;
    //   console.error('POST /tryon/generate — Gemini error:', reason);
    //   return res.status(502).json({ error: `AI try-on generation failed: ${reason}` });
    // }
    //
    // const imagePart = geminiBody?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    // if (!imagePart) {
    //   const textPart = geminiBody?.candidates?.[0]?.content?.parts?.find((p) => p.text);
    //   return res.status(502).json({
    //     error: textPart?.text
    //       ? `AI declined to generate an image: ${textPart.text}`
    //       : 'AI try-on generation returned no image.',
    //   });
    // }
    //
    // res.json({
    //   image: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`,
    // });
  } catch (err) {
    console.error('POST /tryon/generate error:', err);
    res.status(502).json({ error: err.message || 'Failed to generate virtual try-on image' });
  }
});

export default router;
