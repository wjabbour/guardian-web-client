data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

locals {
  cloudwatch_retention_in_days = {
    standard = 14,
    cannon = 14,
  }
}