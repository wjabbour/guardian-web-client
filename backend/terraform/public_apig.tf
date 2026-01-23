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
      aws_api_gateway_method.login.id,
      aws_api_gateway_integration.create_order.id,
      aws_api_gateway_method.create_order.id,
      aws_api_gateway_integration.update_historical_order.id,
      aws_api_gateway_method.update_historical_order.id,
      aws_api_gateway_integration.retrieve_orders.id,
      aws_api_gateway_method.retrieve_orders.id,
      aws_api_gateway_integration.capture_order.id,
      aws_api_gateway_method.capture_order.id,
      aws_api_gateway_integration.resend_order_email.id,
      aws_api_gateway_method.resend_order_email.id,
      aws_api_gateway_integration.delete_order.id,
      aws_api_gateway_method.delete_order.id,
      aws_api_gateway_integration.me.id,
      aws_api_gateway_method.me.id
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }

  # Ensure the deployment doesn't happen until the route is fully defined
  depends_on = [
    aws_api_gateway_integration.login,
    aws_api_gateway_integration.create_order,
    aws_api_gateway_integration.update_historical_order,
    aws_api_gateway_integration.retrieve_orders,
    aws_api_gateway_integration.capture_order,
    aws_api_gateway_integration.resend_order_email,
    aws_api_gateway_integration.delete_order,
    aws_api_gateway_integration.me
  ]
}

resource "aws_api_gateway_stage" "this" {
  deployment_id = aws_api_gateway_deployment.this.id
  rest_api_id   = aws_api_gateway_rest_api.this.id
  stage_name    = "v1"
}


# Create Order Route
resource "aws_api_gateway_resource" "create_order" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "create-order"
}

resource "aws_api_gateway_method" "create_order" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.create_order.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "create_order" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.create_order.id
  http_method             = aws_api_gateway_method.create_order.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.create_order.lambda_function_invoke_arn
}

# Update Historical Order Route
resource "aws_api_gateway_resource" "update_historical_order" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "update-historical-order"
}

resource "aws_api_gateway_method" "update_historical_order" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.update_historical_order.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "update_historical_order" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.update_historical_order.id
  http_method             = aws_api_gateway_method.update_historical_order.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.update_historical_order.lambda_function_invoke_arn
}

# Retrieve Orders Route
resource "aws_api_gateway_resource" "retrieve_orders" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "retrieve-orders"
}

resource "aws_api_gateway_method" "retrieve_orders" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.retrieve_orders.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "retrieve_orders" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.retrieve_orders.id
  http_method             = aws_api_gateway_method.retrieve_orders.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.retrieve_orders.lambda_function_invoke_arn
}

# Capture Order Route
resource "aws_api_gateway_resource" "capture_order" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "capture-order"
}

resource "aws_api_gateway_method" "capture_order" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.capture_order.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "capture_order" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.capture_order.id
  http_method             = aws_api_gateway_method.capture_order.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.capture_order.lambda_function_invoke_arn
}

# Resend Order Email Route
resource "aws_api_gateway_resource" "resend_order_email" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "resend-order-email"
}

resource "aws_api_gateway_method" "resend_order_email" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.resend_order_email.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "resend_order_email" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.resend_order_email.id
  http_method             = aws_api_gateway_method.resend_order_email.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.resend_order_email.lambda_function_invoke_arn
}

# Delete Order Route
resource "aws_api_gateway_resource" "delete_order" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "delete-order"
}

resource "aws_api_gateway_method" "delete_order" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.delete_order.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "delete_order" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.delete_order.id
  http_method             = aws_api_gateway_method.delete_order.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.delete_order.lambda_function_invoke_arn
}

# Login Route
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

# Me Route
resource "aws_api_gateway_resource" "me" {
  rest_api_id = aws_api_gateway_rest_api.this.id
  parent_id   = aws_api_gateway_rest_api.this.root_resource_id
  path_part   = "me"
}

resource "aws_api_gateway_method" "me" {
  rest_api_id   = aws_api_gateway_rest_api.this.id
  resource_id   = aws_api_gateway_resource.me.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "me" {
  rest_api_id             = aws_api_gateway_rest_api.this.id
  resource_id             = aws_api_gateway_resource.me.id
  http_method             = aws_api_gateway_method.me.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.me.lambda_function_invoke_arn
}