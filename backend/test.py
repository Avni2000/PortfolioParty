import requests
import json

BASE_URL = "http://localhost:5000"

def test_health():
    """Test health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Health: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"Health failed: {e}")

def test_stock_performance():
    """Test stock performance endpoint"""
    try:
        url = f"{BASE_URL}/api/stock-performance?ticker=AAPL&date=2023-01-01&shares=10"
        response = requests.get(url)
        data = response.json()
        print(f"Stock: {response.status_code} - {data.get('ticker', 'ERROR')}, {len(data.get('weeks_data', []))} weeks")
    except Exception as e:
        print(f"Stock test failed: {e}")

if __name__ == "__main__":
    print("Testing API...")
    test_health()
    test_stock_performance()
    print("Done.") 