module "retrieve_orders" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "retrieve-orders"
  handler       = "handler.handler"
  runtime       = "nodejs16.x"
  timeout       = 20

  create_package         = true
  source_path = "../src/public/retrieve_orders/build"
  cloudwatch_logs_retention_in_days = local.cloudwatch_retention_in_days[terraform.workspace]

  publish = true

  attach_policy_json = true
  policy_json = data.aws_iam_policy_document.create_order.json

  allowed_triggers = {
    APIGatewayAny = {
      service    = "apigateway"
      source_arn = "${aws_api_gateway_rest_api.this.execution_arn}/*"
    }
  }
}

data "aws_iam_policy_document" "retrieve_orders" {
  statement {
    actions = [
      "dynamodb:*",
      "secretsmanager:*",
    ]

    resources = ["*"]
  }
}