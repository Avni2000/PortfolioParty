Temporary doc for easy reference.

I recommend using hoppscotch or the like since curl is more annoying/less user friendly.
This document provides example uses for all controllers/endpoints in the Portfolio Party backend API.

## Base URL
```
http://localhost:5000
```

## 1. Stock Performance Controller

**Endpoint:** `GET /api/stock-performance`

**Description:** Get week-by-week stock performance for a single stock investment.

### Parameters:
- `ticker` (required): Stock ticker symbol (e.g., AAPL, MSFT)
- `date` (required): Purchase date in YYYY-MM-DD format
- `shares` (required): Number of shares purchased

### Example Usage:

#### Example 1: Apple Stock Performance
```bash
curl "http://localhost:5000/api/stock-performance?ticker=AAPL&date=2024-01-01&shares=100"
```

#### Example 2: Microsoft Stock Performance
```bash
curl "http://localhost:5000/api/stock-performance?ticker=MSFT&date=2023-06-15&shares=50"
```

#### Example 3: Tesla Stock Performance
```bash
curl "http://localhost:5000/api/stock-performance?ticker=TSLA&date=2024-03-20&shares=25"
```

### JavaScript/Fetch Example:
```javascript
async function getStockPerformance(ticker, date, shares) {
    const response = await fetch(
        `http://localhost:5000/api/stock-performance?ticker=${ticker}&date=${date}&shares=${shares}`
    );
    const data = await response.json();
    console.log(data);
    return data;
}

// Usage
getStockPerformance('AAPL', '2024-01-01', 100);
```

### Expected Response Format:
```json
{
    "ticker": "AAPL",
    "purchase_date": "2024-01-01",
    "shares": 100,
    "purchase_price": 192.53,
    "current_price": 225.77,
    "weeks_data": [
        {
            "week": 0,
            "date": "2024-01-01",
            "stock_price": 192.53,
            "portfolio_value": 19253.00,
            "gain_loss": 0.00,
            "gain_loss_percent": 0.00,
            "stock_change": 0.00,
            "stock_change_percent": 0.00,
            "initial_investment": 19253.00
        }
        // ... more weekly data
    ],
    "total_weeks": 52
}
```

---

## 2. Person Portfolio Controller

**Endpoint:** `POST /api/person-portfolio`

**Description:** Get portfolio performance for a person with multiple stock transactions.

### Request Body Format:
```json
{
    "name": "Person Name",
    "transactions": [
        {
            "ticker": "STOCK_SYMBOL",
            "dateBought": "YYYY-MM-DD",
            "sharesBought": number,
            "dateSold": "YYYY-MM-DD" // optional, if present, position is skipped
        }
    ]
}
```

### Example Usage:

#### Example 1: Single Person Portfolio
```bash
curl -X POST http://localhost:5000/api/person-portfolio \
-H "Content-Type: application/json" \
-d '{
    "name": "John Doe",
    "transactions": [
        {
            "ticker": "AAPL",
            "dateBought": "2024-01-15",
            "sharesBought": 50
        },
        {
            "ticker": "MSFT",
            "dateBought": "2024-02-01",
            "sharesBought": 30
        },
        {
            "ticker": "GOOGL",
            "dateBought": "2024-03-10",
            "sharesBought": 20
        }
    ]
}'
```

#### Example 2: Portfolio with Sold Position
```bash
curl -X POST http://localhost:5000/api/person-portfolio \
-H "Content-Type: application/json" \
-d '{
    "name": "Jane Smith",
    "transactions": [
        {
            "ticker": "TSLA",
            "dateBought": "2023-12-01",
            "sharesBought": 40
        },
        {
            "ticker": "NVDA",
            "dateBought": "2024-01-20",
            "sharesBought": 15,
            "dateSold": "2024-11-01"
        },
        {
            "ticker": "AMD",
            "dateBought": "2024-04-15",
            "sharesBought": 60
        }
    ]
}'
```

### JavaScript/Fetch Example:
```javascript
async function getPersonPortfolio(personData) {
    const response = await fetch('http://localhost:5000/api/person-portfolio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData)
    });
    const data = await response.json();
    console.log(data);
    return data;
}

// Usage
const johnPortfolio = {
    name: "John Doe",
    transactions: [
        { ticker: "AAPL", dateBought: "2024-01-15", sharesBought: 50 },
        { ticker: "MSFT", dateBought: "2024-02-01", sharesBought: 30 }
    ]
};
getPersonPortfolio(johnPortfolio);
```

### Expected Response Format:
```json
{
    "name": "John Doe",
    "stocks": [
        {
            "ticker": "AAPL",
            "purchase_date": "2024-01-15",
            "shares": 50,
            "purchase_price": 185.64,
            "current_price": 225.77,
            "weeks_data": [...],
            "total_weeks": 45
        }
        // ... more stocks
    ],
    "total_investment": 50000.00,
    "total_current_value": 65000.00,
    "total_gain_loss": 15000.00
}
```

---

## 3. People Data Controller

**Endpoint:** `GET /api/people-data`

**Description:** Load and return the people data from the JSON file.

### Example Usage:

#### Example 1: Basic Request
```bash
curl http://localhost:5000/api/people-data
```

#### Example 2: With Error Handling
```bash
curl -f http://localhost:5000/api/people-data || echo "Failed to load people data"
```

### JavaScript/Fetch Example:
```javascript
async function getPeopleData() {
    try {
        const response = await fetch('http://localhost:5000/api/people-data');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('People data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching people data:', error);
        return null;
    }
}

// Usage
getPeopleData();
```

### Expected Response Format:
```json
{
    "people": [
        {
            "name": "Person 1",
            "transactions": [
                {
                    "ticker": "AAPL",
                    "dateBought": "2024-01-01",
                    "sharesBought": 100
                }
            ]
        }
        // ... more people
    ]
}
```

---

## 4. Health Check Controller

**Endpoint:** `GET /health`

**Description:** Simple health check to verify the API is running.

### Example Usage:

#### Example 1: Basic Health Check
```bash
curl http://localhost:5000/health
```

#### Example 2: Health Check with Timeout
```bash
curl --max-time 5 http://localhost:5000/health
```

### JavaScript/Fetch Example:
```javascript
async function healthCheck() {
    try {
        const response = await fetch('http://localhost:5000/health');
        const data = await response.json();
        console.log('Health status:', data);
        return data.status === 'healthy';
    } catch (error) {
        console.error('Health check failed:', error);
        return false;
    }
}

// Usage
healthCheck().then(isHealthy => {
    console.log('API is healthy:', isHealthy);
});
```

### Expected Response:
```json
{
    "status": "healthy",
    "message": "Portfolio Party Backend is running!"
}
```

---

## Error Handling Examples

### Stock Performance Errors:
```bash
# Missing required parameters
curl "http://localhost:5000/api/stock-performance?ticker=AAPL"
# Response: {"error": "Missing required parameters. Need: ticker, date, shares"}

# Invalid ticker
curl "http://localhost:5000/api/stock-performance?ticker=INVALID&date=2024-01-01&shares=100"
# Response: {"error": "No data found for ticker INVALID"}
```

### Person Portfolio Errors:
```bash
# Invalid JSON
curl -X POST http://localhost:5000/api/person-portfolio \
-H "Content-Type: application/json" \
-d 'invalid json'
# Response: {"error": "..."}

# Missing transaction data
curl -X POST http://localhost:5000/api/person-portfolio \
-H "Content-Type: application/json" \
-d '{"name": "Test User"}'
# Response: Portfolio with empty stocks array
```

---
