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

  assume_role {
    role_arn = local.roles[terraform.workspace]
  }
}

locals {
  roles = {
    standard = "arn:aws:iam::058264160952:role/guardian-cicd-deployments",
    cannon = "arn:aws:iam::732682028282:role/guardian_web_client_deployments"
  }
}

provider "archive" {}