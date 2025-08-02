terraform {
  required_version = "1.6.6"

  required_providers {
    authentik = {
      # tflint-ignore: terraform_required_providers
      source = "goauthentik/authentik"
    }
  }
}

provider "authentik" {
}
