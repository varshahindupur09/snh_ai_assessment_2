variable "lambda_function_name" {
  default = "bedrock-llm-lambda"
}

variable "lambda_zip_path" {
  default = "../tree-api/src/llm/bedrock-llm-lambda/package/bedrock_llm_lambda.zip"
}
