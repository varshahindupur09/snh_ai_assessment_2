import json
import boto3

bedrock = boto3.client("bedrock-runtime")

def lambda_handler(event, context):
    prompt = event.get("prompt", "")

    model_prompt = f"""
Human: You are a JSON assistant. Convert this natural language into a structured JSON filter.
Only respond with JSON like {{ "parent": "..." }} or similar. No explanations.

Prompt: "{prompt}"

Assistant:"""

    response = bedrock.invoke_model(
        modelId="anthropic.claude-v2",  # Or claude-3-sonnet if allowed
        contentType="application/json",
        accept="application/json",
        body=json.dumps({
            "prompt": model_prompt,
            "max_tokens_to_sample": 200,
            "temperature": 0.2
        })
    )

    result = json.loads(response['body'].read())["completion"]
    structured = json.loads(result)

    return {
        "structuredFilters": structured
    }
