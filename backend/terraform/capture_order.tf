module "capture_order" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "capture-order"
  handler       = "handler.handler"
  runtime       = "nodejs16.x"
  timeout       = 20

  create_package         = true
  source_path = "../src/public/capture_order/build"
  cloudwatch_logs_retention_in_days = local.cloudwatch_retention_in_days[terraform.workspace]

  publish = true

  attach_policy_json = true
  policy_json = data.aws_iam_policy_document.capture_order.json

  allowed_triggers = {
    APIGatewayAny = {
      service    = "apigateway"
      source_arn = "${aws_api_gateway_rest_api.this.execution_arn}/*"
    }
  }
}

data "aws_iam_policy_document" "capture_order" {
  statement {
    actions = [
      "dynamodb:*",
      "secretsmanager:*",
      "ses:*"
    ]

    resources = ["*"]
  }
}