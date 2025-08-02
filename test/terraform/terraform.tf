# tflint-ignore: terraform_required_providers
terraform {
  required_version = "1.6.6"

  required_providers {
    bitwarden = {
      source = "maxlaverse/bitwarden"
    }
  }
}

provider "bitwarden" {
  experimental {
    embedded_client = true
  }
}
