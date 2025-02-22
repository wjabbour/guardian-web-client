terraform {
  backend "s3" {
    bucket = var.bucket
    key    = "terraform.tfstate"
    workspace_key_prefix = ""
    region = "us-east-1"
  }
}

provider "aws" {
	region = "us-east-1"
}

provider "archive" {}