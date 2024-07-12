resource "aws_sns_topic" "Contactary" {
  name = "aws-contactary"
  
  # Các thuộc tính khác của SNS topic nếu cần thiết
  # Ví dụ:
  # display_name = "My Example Topic"
  # policy       = data.aws_iam_policy_document.sns_topic.json
}
