terraform{
    backend "s3" {
        bucket = "aws-cicd-contactary"
        encrypt = true
        key = "terraform.tfstate"
        region = "ap-southeast-1"
        profile = "terraform-user"
    }
}

provider "aws" {
    region = "ap-southeast-1"
    profile = "terraform-user"
}