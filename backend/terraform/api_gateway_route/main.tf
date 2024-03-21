resource "aws_api_gateway_resource" "this" {
  parent_id   = var.api_gateway.root_resource_id
  path_part   = var.path_part
  rest_api_id = var.api_gateway.id
}

resource "aws_api_gateway_method" "this" {
  authorization = "NONE"
  http_method   = var.http_method
  resource_id   = aws_api_gateway_resource.this.id
  rest_api_id   = var.api_gateway.id
}

module "this" {
  source = "squidfunk/api-gateway-enable-cors/aws"
  version = "0.3.3"
  api_id          = var.api_gateway.id
  api_resource_id = aws_api_gateway_resource.this.id
}

resource "aws_api_gateway_integration" "this" {
  rest_api_id             = var.api_gateway.id
  resource_id             = aws_api_gateway_resource.this.id
  http_method             = aws_api_gateway_method.this.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.uri
}