module "send_order_data" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "send-order-data"
  handler       = "handler.handler"
  runtime       = "nodejs16.x"
  timeout       = 20

  create_package         = true
  source_path = "../src/public/send_order_data/build"
  cloudwatch_logs_retention_in_days = local.cloudwatch_retention_in_days[terraform.workspace]

  publish = true

  attach_policy_json = true
  policy_json = data.aws_iam_policy_document.send_order_data.json

  allowed_triggers = {
    EventBridgeAny = {
      service = "events"
      source_arn = module.eventbridge.eventbridge_rule_arns["crons"]
    }
  }

  environment_variables = {
    DEPLOYMENT = var.deployment
  }
}

data "aws_iam_policy_document" "send_order_data" {
  statement {
    actions = [
      "dynamodb:*",
      "secretsmanager:*",
      "ses:*"
    ]

    resources = ["*"]
  }
}