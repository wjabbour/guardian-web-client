module "me" {
  source = "terraform-aws-modules/lambda/aws"
  version = "8.2.0"

  function_name = "me"
  handler       = "handler.handler"
  runtime       = "nodejs20.x"
  timeout       = 20

  create_package         = true
  source_path = "../src/public/me/build"
  cloudwatch_logs_retention_in_days = local.cloudwatch_retention_in_days[terraform.workspace]

  publish = true

  allowed_triggers = {
    APIGatewayAny = {
      service    = "apigateway"
      source_arn = "${aws_api_gateway_rest_api.this.execution_arn}/*"
    }
  }
}
