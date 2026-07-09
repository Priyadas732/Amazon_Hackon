import gradio as gr
from main import app as fastapi_app

# Force Hugging Face ZeroGPU static scanner to detect GPU usage in the entrypoint
try:
    import spaces
    @spaces.GPU
    def hf_static_scanner_trigger():
        pass
except ImportError:
    pass

# Define a simple Gradio blocks landing page for the Space UI
with gr.Blocks(title="Amazon Returniverse AI Grading Engine") as demo:
    gr.Markdown("# 🤖 Returniverse & MarketConnect AI Vision Grading Engine")
    gr.Markdown("The grading APIs are active and mounted on this Hugging Face Space.")
    
    with gr.Accordion("Mounted API Endpoints Guide", open=True):
        gr.Markdown("""
        - **POST `/grade`**: Submit photos and metadata for quality assessment.
        - **GET `/status/{requestId}`**: Poll the analysis status.
        - **GET `/result/{requestId}`**: Retrieve the completed inspection report.
        """)

# Mount our FastAPI endpoints directly on the Gradio web server
app = gr.mount_gradio_app(fastapi_app, demo, path="/")
