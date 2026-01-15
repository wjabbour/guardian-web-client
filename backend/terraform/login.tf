data "aws_secretsmanager_secret" "admin_password" {
  name = "admin_password"
}

module "login" {
  source = "terraform-aws-modules/lambda/aws"
  version = "8.2.0"

  function_name = "login"
  handler       = "handler.handler"
  runtime       = "nodejs20.x"
  timeout       = 20

  create_package         = true
  source_path = "../src/public/login/build"
  cloudwatch_logs_retention_in_days = local.cloudwatch_retention_in_days[terraform.workspace]

  publish = true

  attach_policy_json = true
  policy_json = data.aws_iam_policy_document.login.json

  allowed_triggers = {
    APIGatewayAny = {
      service    = "apigateway"
      source_arn = "${aws_api_gateway_rest_api.this.execution_arn}/*"
    }
  }
}

data "aws_iam_policy_document" "login" {
  statement {
    actions = [
      "secretsmanager:GetSecretValue"
    ]

    resources = [
      data.aws_secretsmanager_secret.admin_password.arn
    ]
  }
}
