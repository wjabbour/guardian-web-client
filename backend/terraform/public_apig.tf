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
      # 1. Lambda Code Changes
      module.create_order.lambda_function_source_code_hash,
      module.retrieve_orders.lambda_function_source_code_hash,
      module.capture_order.lambda_function_source_code_hash,
      module.update_historical_order.lambda_function_source_code_hash,
      module.resend_order_email.lambda_function_source_code_hash,
      module.delete_order.lambda_function_source_code_hash,
      module.login.lambda_function_source_code_hash,
      module.me.lambda_function_source_code_hash,

      aws_api_gateway_integration.login.id,
      aws_api_gateway_method.login.id
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }

  # Ensure the deployment doesn't happen until the route is fully defined
  depends_on = [
    aws_api_gateway_integration.login,
    module.create_order_route,
    module.update_historical_order_route,
    module.retrieve_orders_route,
    module.capture_order_route,
    module.resend_order_email_route,
    module.delete_order_route,
    module.me_route
  ]
}

resource "aws_api_gateway_stage" "this" {
  deployment_id = aws_api_gateway_deployment.this.id
  rest_api_id   = aws_api_gateway_rest_api.this.id
  stage_name    = "v1"
}

# --- Standard Modules ---

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

module "delete_order_route" {
  source      = "./api_gateway_route"
  http_method = "POST"
  path_part   = "delete-order"
  uri         = module.delete_order.lambda_function_invoke_arn
  api_gateway = aws_api_gateway_rest_api.this
}

# --- MANUAL LOGIN ROUTE (Bypassing Module for Pure Proxy) ---

resource "aws_api_gateway_resource" "login" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "login"
}

resource "aws_api_gateway_method" "login" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.login.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "login" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.login.id
  http_method             = aws_api_gateway_method.login.http_method
  integration_http_method = "POST" 
  type                    = "AWS_PROXY"
  uri                     = module.login.lambda_function_invoke_arn
}

# --- End Manual Route ---

module "me_route" {
  source      = "./api_gateway_route"
  http_method = "GET"
  path_part   = "me"
  uri         = module.me.lambda_function_invoke_arn
  api_gateway = aws_api_gateway_rest_api.this
}