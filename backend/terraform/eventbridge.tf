module "eventbridge" {
  source = "terraform-aws-modules/eventbridge/aws"

  create_bus = false

  rules = {
    crons = {
      description         = "Trigger lambda every Friday at 22:00 UTC"
      schedule_expression = "cron(0 22 ? * FRI *)"
    }
  }

  targets = {
    crons = [
      {
        name = "send-order-data"
        arn  = module.send_order_data.lambda_function_arn
      },
    ]
  }
}
