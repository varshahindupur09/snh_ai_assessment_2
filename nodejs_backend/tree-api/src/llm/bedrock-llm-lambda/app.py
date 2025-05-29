# nodejs_backend/tree-api/src/app.module.ts
import os
import json
import re
import boto3

bedrock = boto3.client("bedrock-runtime", region_name="us-east-1")

def lambda_handler(event, context):
    prompt = event.get("prompt", "")
    print("🔍 Prompt received:", prompt)

    model_prompt = f"""
You are a JSON assistant.

Convert the instruction into a single, flat JSON object like {{ "parent": "bear" }}.

❌ Do NOT escape quotes (e.g., no \\\").
❌ Do NOT wrap output in markdown (e.g., no ```json).
✅ Return raw JSON as-is, one object only.

Instruction: "{prompt}"
"""


    response = bedrock.invoke_model(
        modelId="us.meta.llama4-maverick-17b-instruct-v1:0",
        contentType="application/json",
        accept="application/json",
        body=json.dumps({
            "prompt": model_prompt,
            "temperature": 0.2,
            "max_gen_len": 100,
            "top_p": 0.9
        })
    )

    raw_str = response['body'].read().decode("utf-8")
    print("🧾 Raw body from Bedrock:", raw_str)

    try:
        result = json.loads(raw_str)
        generation = result.get("generation") or result.get("completion")
        print("📤 Raw generated text:", generation)

        # ✅ Match first valid JSON object only
        # match = re.search(r'\{(?:[^{}]|(?R))*\}', generation)
        match = re.search(r'\{[^{}]*\}', generation)
        if not match:
            raise ValueError("No valid JSON object found")

        json_text = match.group(0)
        structured = json.loads(json_text)

        return {
            "structuredFilters": structured
        }

    except Exception as e:
        print("❌ Parsing failed:", str(e))
        return {
            "error": str(e),
            "raw": raw_str
        }
