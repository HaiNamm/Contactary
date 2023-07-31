#!/bin/bash
sudo su
yum update -y
yum install -y httpd
cd /var/www/html
wget https://github.com/Contactary/contactary-fe/archive/refs/heads/develop.zip
unzip develop.zip
cp -r contactary-fe-develop/* /var/www/html/
mv /var/www/html/contactary-fe-develop/index.html /var/www/html/
rm -rf contactary-fe-develop develop.zip
systemctl enable httpd 
systemctl start httpd
