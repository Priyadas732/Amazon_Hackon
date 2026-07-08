# Complete Technology Stack

---

## Frontend Service (`Frontend/`)

| Category | Technology | Version | Purpose |
|---|---|---|---|
| **UI Library** | React | 19.2.7 | Component-based SPA rendering |
| **Build Tool** | Vite | 8.1.1 | Dev server with HMR, production bundler |
| **CSS Framework** | Tailwind CSS | 4.3.2 | Utility-first styling |
| **Tailwind Plugin** | @tailwindcss/vite | 4.3.2 | Vite integration for Tailwind |
| **React Plugin** | @vitejs/plugin-react | 6.0.3 | JSX transform, fast refresh |
| **Linting** | oxlint | 1.71.0 | Fast Rust-based JS/TS linter |
| **Language** | JavaScript (ES Modules) | ES2022+ | Application logic |
| **State Management** | React Hooks (custom `useGlobalState`) | — | Global state via `useState` + `useEffect` + `useCallback` |
| **HTTP Client** | Fetch API (native) | — | REST calls to Backend (wrapper: `apiFetch()`) |
| **Geolocation** | Nominatim (OpenStreetMap) | — | Reverse geocoding for location display |
| **Dev Server Port** | localhost | :5173 | Vite default dev port |

---

## Backend Service (`Backend/`)

| Category | Technology | Version | Purpose |
|---|---|---|---|
| **Runtime** | Node.js | ≥ 20 | Server-side JavaScript runtime |
| **Framework** | Express.js | 4.19.2 | REST API framework |
| **ORM** | Prisma Client | 5.16.0 | Type-safe PostgreSQL ORM + query builder |
| **Schema Tool** | Prisma CLI | 5.16.0 | DB migrations, schema push, studio, seed |
| **File Uploads** | Multer | 2.2.0 | Multipart form-data parsing (photos) |
| **CORS** | cors | 2.8.5 | Cross-origin resource sharing middleware |
| **Env Config** | dotenv | 16.4.5 | `.env` file loading |
| **Dev Server** | Nodemon | 3.1.4 | Auto-restart on file changes |
| **Language** | JavaScript (ES Modules) | ES2022+ | Application logic |
| **Dev Server Port** | localhost | :5000 | Backend API port |

---

## AI Microservice (`AI1/`)

| Category | Technology | Version | Purpose |
|---|---|---|---|
| **Runtime** | Node.js | ≥ 20 | Server-side TypeScript runtime |
| **Language** | TypeScript | 5.7.2 | Strict type-safe application code |
| **Framework** | Fastify | 4.28.0 | High-performance HTTP framework |
| **File Uploads** | @fastify/multipart | 8.3.0 | Multipart form-data parsing |
| **Schema Validation** | Zod | 3.23.8 | Runtime schema validation for AI outputs |
| **Image Processing** | Sharp | 0.33.5 | Resize, compress, convert images for analysis |
| **Image Dedup** | sharp-phash | 2.2.0 | Perceptual hashing for duplicate photo detection |
| **File Type Detection** | file-type | 19.6.0 | Validate actual file MIME types (not just extension) |
| **UUID Generation** | uuid | 11.0.3 | Unique request IDs |
| **Logging** | Pino | 9.5.0 | Structured JSON logging |
| **Log Formatting** | pino-pretty | 11.3.0 | Human-readable log output in dev |
| **Env Config** | dotenv | 16.4.5 | `.env` file loading |
| **Dev Runner** | tsx | 4.19.2 | TypeScript execution with hot-reload |
| **TS Compiler** | tsc (TypeScript) | 5.7.2 | Production build to JavaScript |
| **Dev Server Port** | localhost | :3000 | AI service port |

---

## AI / Machine Learning

| Category | Technology | Model ID | Purpose |
|---|---|---|---|
| **Primary Vision AI** | Google Gemini | `gemini-2.5-flash` | Multi-angle product photo analysis, damage detection |
| **Fallback Vision AI** | Google Gemma | `gemma-4-26b-a4b-it` | Fallback when Gemini quota exhausted (~20 req/day free) |
| **AI SDK** | @google/generative-ai | 0.21.0 | Google Generative AI JavaScript client |
| **Resilience Pattern** | Circuit Breaker | Custom | Auto-fallback from Gemini → Gemma on quota/errors |
| **Output Repair** | Repair & Re-prompt | Custom | JSON parse recovery + Zod validation + model re-prompt |
| **Voting System** | Majority Voting (N=3) | Custom | Run N detection passes, vote-merge damages |
| **Deduplication** | Cross-View Dedup | Custom | Merge same damage detected from multiple photo angles |
| **Grading Engine** | Deterministic Rules Engine | Custom | Score → Grade mapping, hard caps, confidence, human review flags |

---

## Cloud Infrastructure & Databases

| Category | Technology | Provider | Purpose |
|---|---|---|---|
| **Primary Database** | PostgreSQL | Supabase (managed) | All app state: profiles, returns, P2P, donations, leaderboard |
| **Connection Mode** | Connection Pooler (Session) | Supabase | IPv4 dual-stack access (port 5432) |
| **Object Storage** | Amazon S3 | AWS | Product photo archive (originals + analysis copies) |
| **URL Signing** | S3 Presigned URLs | AWS | Temporary access to archived photos |
| **NoSQL Database** | Amazon DynamoDB | AWS | AI grading request records, status tracking |
| **AWS SDK (S3)** | @aws-sdk/client-s3 | 3.700.0 | S3 operations (putObject, getObject) |
| **AWS SDK (Presigner)** | @aws-sdk/s3-request-presigner | 3.700.0 | Generate presigned URLs for photos |
| **AWS SDK (DynamoDB)** | @aws-sdk/client-dynamodb | 3.700.0 | Low-level DynamoDB client |
| **AWS SDK (DDB Doc)** | @aws-sdk/lib-dynamodb | 3.700.0 | High-level DynamoDB document client |
| **AWS Region** | ap-south-1 | AWS | Mumbai region |

---

## Database Tables (Prisma Schema)

| Table Name | Model | Key Fields | Purpose |
|---|---|---|---|
| `profiles` | Profile | id, email, greenCredits, treesPlanted, causesHelped | User accounts & gamification stats |
| `returns` | Return | id, category, price, userGrade, agentGrade, aiRequestId, aiStatus | Return items with AI grading results |
| `p2p_products` | P2pProduct | id, title, price, condition, sellerId, verified | Peer-to-peer resale marketplace listings |
| `p2p_chats` | P2pChat | id, itemTitle, itemPrice | Buyer-seller chat conversations |
| `p2p_messages` | P2pMessage | id, chatId, text, isMe | Individual chat messages |
| `ngo_campaigns` | NgoCampaign | id, title, ngoName, urgency, progress, target | NGO donation campaign listings |
| `donation_history` | DonationHistory | id, userId, ngo, action, credits | Donation & redemption audit log |
| `purchase_history` | PurchaseHistory | id, userId, itemName, size, category | Past purchases (powers size recommendations) |
| `leaderboard` | Leaderboard | rank, name, verifiedCount, accuracy, score | Pickup agent performance rankings |

---

## DevOps & Tooling

| Category | Technology | Version | Purpose |
|---|---|---|---|
| **Containerization** | Docker | — | AI1 service containerization |
| **Orchestration** | Docker Compose | 3.8 | Local multi-container dev (DynamoDB Local + MinIO + AI1) |
| **Local S3** | MinIO | latest | S3-compatible local object storage for dev |
| **Local DynamoDB** | DynamoDB Local | latest | Local DynamoDB for dev/testing |
| **Unit Testing** | Vitest | 2.1.8 | Fast Vite-native test runner (AI1) |
| **Test Coverage** | @vitest/coverage-v8 | 2.1.8 | V8-based code coverage reports |
| **AWS Mocking** | aws-sdk-client-mock | 4.1.0 | Mock AWS SDK calls in unit tests |
| **Form Data (tests)** | form-data | 4.0.1 | Construct multipart requests in tests |
| **Version Control** | Git + GitHub | — | Source code management |
| **Package Manager** | npm | — | Dependency management (all 3 services) |

---

## API Endpoints Summary

| Service | Route | Methods | Purpose |
|---|---|---|---|
| Backend | `/api/returns` | GET, PUT | List & update returns |
| Backend | `/api/returns/submit` | POST | Finalize a customer return |
| Backend | `/api/grading/:returnId/submit` | POST | Forward photos to AI1 for grading |
| Backend | `/api/grading/:returnId/status` | GET | Proxy AI1 grading status |
| Backend | `/api/grading/:returnId/result` | GET | Proxy AI1 result + persist grade |
| Backend | `/api/p2p/products` | GET, POST | List & create P2P listings |
| Backend | `/api/p2p/products/:id/reveal-phone` | POST | Reveal seller phone (costs credits) |
| Backend | `/api/p2p/chats` | GET, POST | List & start P2P chats |
| Backend | `/api/p2p/chats/:id/messages` | POST | Send a chat message |
| Backend | `/api/donations/campaigns` | GET | List all NGO campaigns |
| Backend | `/api/donations/campaigns/need` | POST | NGO creates a new need |
| Backend | `/api/donations/campaigns/:id` | PATCH | Edit an existing campaign |
| Backend | `/api/donations/donate` | POST | Donate items to campaign |
| Backend | `/api/donations/redeem` | POST | Redeem green credits for perks |
| Backend | `/api/profile` | GET | User profile + stats |
| Backend | `/api/profile/leaderboard` | GET | Agent performance leaderboard |
| Backend | `/api/config/subcategories` | GET | Subcategory taxonomy config |
| Backend | `/api/tryon/analyze` | POST | Virtual try-on analysis |
| Backend | `/api/tryon/size-finder` | POST | Shoe size recommendation |
| AI1 | `POST /grade` | POST | Submit photos for grading |
| AI1 | `GET /status/:id` | GET | Poll grading progress |
| AI1 | `GET /result/:id` | GET | Fetch final report + presigned URLs |

---

## Key Design Patterns

| Pattern | Where Used | Description |
|---|---|---|
| **Microservice Architecture** | System-wide | 3 independent services (Frontend, Backend, AI1) |
| **API Gateway / Proxy** | Backend `/api/grading` | Backend proxies all AI requests; Frontend never talks to AI1 directly |
| **Circuit Breaker** | AI1 Orchestrator | Auto-fallback from Gemini to Gemma after N failures |
| **Majority Voting** | AI1 Pipeline | Run N detection passes, vote-merge for consensus |
| **Deterministic Rules Engine** | AI1 Grading | Score computed from weighted damage table, not AI opinion |
| **Hard Grade Caps** | AI1 Rules | Certain damages force a maximum grade (water→F, crack→D) |
| **Band-Edge Re-run** | AI1 Pipeline | If score is ±3 of grade boundary on N=1, auto-rerun with N=3 |
| **Repair & Re-prompt** | AI1 Orchestrator | If AI output fails validation, send error feedback and re-prompt once |
| **Idempotency** | AI1 Intake | Prevent duplicate grading submissions (in-memory TTL) |
| **Async Processing** | AI1 Pipeline | `/grade` returns immediately; grading runs in background |
| **Polling** | Frontend → Backend | Client polls `/status` every ~2.5s until COMPLETED |
| **Green Credits Gamification** | Backend Donations | Earn credits for donating/selling, spend on marketplace perks |
