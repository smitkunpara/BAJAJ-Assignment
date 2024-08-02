import requests

url = "http://127.0.0.1:8000/bfhl"
payload = {"data": ["M", "1", "334", "4", "B"]}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())