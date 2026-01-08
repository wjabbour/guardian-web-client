resource "aws_api_gateway_rest_api" "this" {
	name = "public"

  endpoint_configuration {
    types = ["EDGE"]
  }
}

resource "aws_api_gateway_deployment" "this" {
  rest_api_id = aws_api_gateway_rest_api.this.id

  triggers = {
    redeployment = sha1(jsonencode([
      module.create_order_route,
      module.retrieve_orders_route,
      module.capture_order_route,
      module.update_historical_order,
      module.resend_order_email_route
    ]))
  }

  variables = {
    deployed_at = "${timestamp()}"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "this" {
  deployment_id = aws_api_gateway_deployment.this.id
  rest_api_id   = aws_api_gateway_rest_api.this.id
  stage_name    = "v1"
}

module "create_order_route" {
  source      = "./api_gateway_route"
  http_method = "POST"
  path_part   = "create-order"
  uri         = module.create_order.lambda_function_invoke_arn
  api_gateway = aws_api_gateway_rest_api.this
}

module "update_historical_order_route" {
  source      = "./api_gateway_route"
  http_method = "POST"
  path_part   = "update-historical-order"
  uri         = module.update_historical_order.lambda_function_invoke_arn
  api_gateway = aws_api_gateway_rest_api.this
}


module "retrieve_orders_route" {
  source      = "./api_gateway_route"
  http_method = "POST"
  path_part   = "retrieve-orders"
  uri         = module.retrieve_orders.lambda_function_invoke_arn
  api_gateway = aws_api_gateway_rest_api.this
}

module "capture_order_route" {
  source      = "./api_gateway_route"
  http_method = "POST"
  path_part   = "capture-order"
  uri         = module.capture_order.lambda_function_invoke_arn
  api_gateway = aws_api_gateway_rest_api.this
}

module "resend_order_email_route" {
  source      = "./api_gateway_route"
  http_method = "POST"
  path_part   = "resend-order-email"
  uri         = module.resend_order_email.lambda_function_invoke_arn
  api_gateway = aws_api_gateway_rest_api.this
}