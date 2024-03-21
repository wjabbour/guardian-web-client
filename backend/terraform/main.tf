data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

locals {
  cloudwatch_retention_in_days = {
    prod = 14
  }
}