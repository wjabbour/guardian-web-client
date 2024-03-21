resource "aws_dynamodb_table" "orders_table" {
  name           = "orders"
  billing_mode   = "PROVISIONED"
  hash_key       = "email"
  range_key      = "created_at"
  write_capacity     = 1
  read_capacity      = 1

  attribute {
    name = "email"
    type = "S"
  }

  attribute {
    name = "created_at"
    type = "S"
  }

  attribute {
    name = "paid"
    type = "N"
  }

  attribute {
    name = "order_id"
    type = "S"
  }

  global_secondary_index {
    name               = "paid-index"
    hash_key           = "paid"
    write_capacity     = 1
    read_capacity      = 1
    projection_type    = "ALL"
    non_key_attributes = []
  }

  global_secondary_index {
    name               = "order-id-index"
    hash_key           = "order_id"
    write_capacity     = 1
    read_capacity      = 1
    projection_type    = "ALL"
    non_key_attributes = []
  }
}

resource "aws_dynamodb_table" "archived_orders_table" {
  name           = "archived_orders"
  billing_mode   = "PROVISIONED"
  hash_key       = "email"
  range_key      = "created_at"
  write_capacity     = 1
  read_capacity      = 1

  attribute {
    name = "email"
    type = "S"
  }

  attribute {
    name = "created_at"
    type = "S"
  }
}