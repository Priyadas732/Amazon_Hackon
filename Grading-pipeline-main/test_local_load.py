import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

print("--- Testing Local Model Loading ---")
try:
    import ai_engine
    print("ai_engine imported successfully.")
    print("Loading models (this might take a few seconds)...")
    ai_engine.initialize_models()
    print("SUCCESS: Local models initialized and loaded successfully!")
except Exception as e:
    import traceback
    print("ERROR: Loading failed locally!")
    traceback.print_exc()
    sys.exit(1)
