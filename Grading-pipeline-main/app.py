import os
import gradio as gr
from PIL import Image
import torch
import types

# 1. ZeroGPU spaces import/mock wrapper
try:
    import spaces
    gpu_decorator = spaces.GPU
    print("ZeroGPU environment detected, loaded @spaces.GPU decorator.")
except ImportError:
    def gpu_decorator(func):
        return func
    print("Standard environment detected, using CPU/Local GPU.")

# 2. Import grading pipeline components
import ai_engine
from routing import (
    normalize_category,
    grade_from_structural_features,
    apply_semantic_rules,
    reconcile_final_grade,
    calculate_nrv_route
)

# Initialize YOLO and Moondream models sequentially on CPU
ai_engine.initialize_models()

# 3. Define the core grading function decorated for ZeroGPU execution
@gpu_decorator
def grade_item_api(image_pil, category, return_reason, customer_notes):
    """
    Executes the visual grading and defect inspection pipeline on ZeroGPU.
    Returns the raw features and validations in the format expected by the Backend client.
    """
    try:
        if image_pil is None:
            return {
                "raw_detections": [],
                "semantic_features": {},
                "messages": ["No image uploaded."]
            }

        # Step A: Category mismatch verification (Moondream VLM)
        v_res = ai_engine.verify_category_match(image_pil, category)
        
        # Step B: Defect and damage detection (YOLOv11)
        struct_res = ai_engine.extract_structural_features(image_pil)

        # Step C: Semantic feature flags extraction (Moondream VLM)
        semantic_res = ai_engine.extract_semantic_features(image_pil, category)

        # Step D: Scoring engine & grading calculation (routing.py)
        struct_grade, damages = grade_from_structural_features(struct_res["defect_counts"], category)
        semantic_grade = apply_semantic_rules(semantic_res, category)
        final_grade = reconcile_final_grade(struct_grade, semantic_grade)

        # Step E: Net Recovery Value and disposition route calculation
        # Mock base_price and penalty defaults to prevent exceptions
        nrv_decision = calculate_nrv_route(
            category=category,
            base_price=299.0,
            final_grade=final_grade,
            penalty_pct=0.0,
            defect_counts=struct_res["defect_counts"],
            semantic_flags=semantic_res,
            gatekeeper_repairs=[]
        )

        messages = []
        if not v_res["verified"]:
            messages.append(f"Category Mismatch: Selected '{category}' but photo shows '{v_res['detected_raw']}'")

        # Return the exact old structure to preserve client adapter compatibility
        return {
            "category": category,
            "final_grade": final_grade,
            "route": nrv_decision.get("mrv_route", "Return to Inventory"),
            "gatekeeper_is_terminal": False,
            "gatekeeper_grade_cap": "A+",
            "structural_features": struct_res["defect_counts"],
            "semantic_features": semantic_res,
            "semantic_adjustments": [],
            "raw_detections": struct_res["raw_detections"],
            "financials": nrv_decision,
            "repair_actions": [],
            "messages": messages
        }

    except Exception as e:
        import traceback
        print(f"Error during AI grading: {e}")
        traceback.print_exc()
        return {
            "raw_detections": [],
            "semantic_features": {},
            "messages": [f"Internal grading error: {str(e)}"]
        }

# 4. Create Gradio interface
demo = gr.Interface(
    fn=grade_item_api,
    inputs=[
        gr.Image(type="pil", label="Item Photo"),
        gr.Textbox(label="Category", value="Electronics"),
        gr.Textbox(label="Return Reason", value="Customer Return"),
        gr.Textbox(label="Customer Notes", value="Listing item")
    ],
    outputs=gr.JSON(label="Grading Result"),
    title="Amazon Returniverse AI Grading Engine",
    description="ZeroGPU powered machine learning grading microservice for returns and peer-to-peer listings."
)

# Launch Gradio app
if __name__ == "__main__":
    demo.launch(server_name="0.0.0.0", server_port=7860)
