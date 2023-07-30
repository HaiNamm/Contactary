terraform{
    backend "s3" {
        bucket = "aws-aosnote-terraformstate-bucket"
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