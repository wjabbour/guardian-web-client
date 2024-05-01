terraform {
  backend "s3" {
    bucket = "stivers-terraform-state"
    key    = "terraform.tfstate"
    workspace_key_prefix = ""
    region = "us-east-1"
  }
}

provider "aws" {
	region = "us-east-1"
}

provider "archive" {}