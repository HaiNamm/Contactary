# create security group for the ec2 instance
resource "aws_security_group" "ec2_security_group" {
  name        = "ec2 security group"
  description = "allow access on ports 80 and 22"
  vpc_id      = aws_vpc.myvpc.id

  ingress {
    description = "http access"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "ssh access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ec2 security group"
  }
}

# use data source to get a registered amazon linux 2 ami
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }
}

# launch the ec2 instance and install website
resource "aws_instance" "ec2_instance" {
  ami                    = data.aws_ami.amazon_linux_2.id
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.PublicSubnet.id
  vpc_security_group_ids = [aws_security_group.ec2_security_group.id]
  key_name               = "myec2key"

  tags = {
    Name = "web server"
  }
  user_data = <<-EOF
              #!/bin/bash
              sudo yum install -y git
              sudo yum update -y
              sudo yum install -y httpd
              sudo amazon-linux-extras install -y epel
              sudo yum install -y nodejs npm
              sudo systemctl enable httpd
              sudo systemctl start httpd

              # Tải mã nguồn của trang web React từ GitHub và triển khai nó
              sudo yum install -y unzip
              cd /var/www/html
              sudo wget https://github.com/Contactary/contactary-fe/archive/refs/heads/develop.zip
              sudo unzip develop.zip
              sudo chown -R ec2-user:ec2-user contactary-fe-develop
              cd contactary-fe-develop && sudo su ec2-user -c "npm install && npm run build"

              # Di chuyển build output tới thư mục html của Apache
              sudo cp -r build/* /var/www/html/

              # Tạo tệp cấu hình Apache cho ứng dụng React
              sudo bash -c 'cat << EOT > /etc/httpd/conf.d/react_app.conf
<VirtualHost *:80>
    DocumentRoot /var/www/html
    <Directory /var/www/html>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
EOT'
EOF
}

# print the url of the server
output "ec2_public_ipv4_url" {
  value = join("", ["http://", aws_instance.ec2_instance.public_ip])
}
