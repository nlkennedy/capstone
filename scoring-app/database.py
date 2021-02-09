import os
import mysql.connector
from dotenv import load_dotenv

# print(os.environ)
load_dotenv()

TEST_VAR = os.getenv('TEST_VAR')
print(TEST_VAR)

print(os.getenv('DB_USER'))

mydb = mysql.connector.connect(
    host = os.getenv('DB_HOST'),
    user = os.getenv('DB_USER'),
    password = os.getenv('DB_PASSWORD'),
    database = os.getenv('DATABASE'),
)

print(mydb)