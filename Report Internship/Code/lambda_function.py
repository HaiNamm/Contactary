import boto3
import csv
from datetime import datetime
from decimal import Decimal
from io import StringIO
import json
import pytz

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

def lambda_handler(event, context):
    # Lấy bảng DynamoDB
    table = dynamodb.Table('hhainam')

    # Đọc dữ liệu từ SQS và ghi vào DynamoDB
    for record in event['Records']:
        # Phân tích cú pháp nội dung tin nhắn SQS
        body = json.loads(record['body'])
        
        # Lấy độ ẩm, nhiệt độ và thời gian từ tin nhắn SQS
        humidity = Decimal(str(body['humidity']))
        temperature = Decimal(str(body['temperature']))
        time = int(record['attributes']['ApproximateFirstReceiveTimestamp'])  # Changed to get SentTimestamp

        # Chuyển đổi thời gian thành datetime, lưu ý rằng SentTimestamp là trong milliseconds
        timestamp = datetime.utcfromtimestamp(time/1000)  # Divide by 1000 to convert milliseconds to seconds

        # Chuyển đổi sang múi giờ Việt Nam
        vietnam_tz = pytz.timezone('Asia/Ho_Chi_Minh')
        timestamp = timestamp.replace(tzinfo=pytz.UTC)
        timestamp = timestamp.astimezone(vietnam_tz)

        # Sử dụng id thiết bị và timestamp làm khóa phân vùng và khóa sắp xếp
        device_id = "ESP8266"  # Set a fixed device_id
        # Viết cho DynamoDB
        table.put_item(
            Item={
                'deviced': device_id,  # Changed 'deviced' to 'device_id'
                'datetime': timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                'humidity': humidity,
                'temperature': temperature
            }
        )
        
    # Lấy thời gian hiện tại
    current_time_utc = datetime.utcnow()
    # Chuyển đổi thời gian hiện tại sang múi giờ Việt Nam
    current_time_vietnam = current_time_utc.replace(tzinfo=pytz.UTC).astimezone(vietnam_tz)
    
    # Kiểm tra xem đã đầu tháng chưa
    is_first_day_of_month = current_time_vietnam.day == 1
    
    # Nếu là đầu tháng, xuất dữ liệu vào S3 và đánh dấu là đã xuất
    if is_first_day_of_month:
        # Tạo file CSV
        csv_file = StringIO()
        csv_writer = csv.writer(csv_file)

        # Đọc dữ liệu từ bảng và xử lý phân trang
        response = table.scan()
        while 'LastEvaluatedKey' in response:
            for item in response['Items']:
                csv_writer.writerow(item.values())
                
                # Remove item from DynamoDB after it's added to the CSV file
                table.delete_item(Key={
                    'deviced': item['deviced'],
                    'datetime': item['datetime']
                })
            # Tiếp tục scan
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])

        # Lấy năm tháng hiện tại 
        current_year_month = current_time_vietnam.strftime('%Y-%m')
        # Ghi CSV vào S3
        response = s3.put_object(
            Bucket='aosnote-terraformstate-bucket',
            Key=f'dataESP8266-{current_year_month}.csv',
            Body=csv_file.getvalue()
        )

        # Đánh dấu là đã xuất dữ liệu
        table.put_item(Item={'deviced': 'ESP8266', 'datetime': current_time_vietnam.strftime('%Y-%m-%d %H:%M:%S')})
    
    # Xác nhận
    return {
        'statusCode': 200,
        'body': json.dumps('Success!'),
    }
