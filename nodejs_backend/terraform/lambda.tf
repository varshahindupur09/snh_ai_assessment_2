data "aws_iam_role" "existing_lambda_role" {
  name = "bedrock-nlp-query-handler-role-34p3pcub"
}

resource "aws_lambda_function" "bedrock_llm_lambda" {
  function_name = var.lambda_function_name
  role          = data.aws_iam_role.existing_lambda_role.arn
  handler       = "app.lambda_handler"
  runtime       = "python3.12"
  timeout       = 10

  filename         = var.lambda_zip_path
  source_code_hash = filebase64sha256(var.lambda_zip_path)

    environment {
    variables = {
      MODEL_ID = "us.meta.llama4-maverick-17b-instruct-v1:0"
    }
  }
}
