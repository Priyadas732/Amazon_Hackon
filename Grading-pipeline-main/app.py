import os
import sys
import uvicorn

# Hijack the Streamlit runner to start our FastAPI app directly on the exposed port (7860)
# This lets us deploy on the 100% FREE Streamlit CPU Basic tier without any ZeroGPU limitations.
print("Streamlit runner hijacked. Launching FastAPI server directly on port 7860...")
port = int(os.environ.get("PORT", 7860))
uvicorn.run("main:app", host="0.0.0.0", port=port)

# Prevent Streamlit from running and causing port conflicts
sys.exit(0)
