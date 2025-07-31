# Portfolio Party - Backend API

A minimal Python Flask backend that fetches **real historical stock data** and provides week-by-week performance analysis.

## 🚀 Quick Start

```bash
# Install dependencies and run
python run.py

# Or manually:
pip install -r requirements.txt
python app.py
```

Server runs on: `http://localhost:5000`

## 📊 API Endpoints

### 1. Get Stock Performance (Single Stock)
```
GET /api/stock-performance?ticker=AAPL&date=2023-01-01&shares=10&price=150.25
```

**Parameters:**
- `ticker` (required): Stock ticker symbol
- `date` (required): Purchase date (YYYY-MM-DD)
- `shares` (required): Number of shares bought
- `price` (optional): Purchase price (uses historical data if not provided)

**Response:**
```json
{
  "ticker": "AAPL",
  "purchase_date": "2023-01-01",
  "shares": 10,
  "purchase_price": 150.25,
  "current_price": 185.30,
  "weeks_data": [
    {
      "week": 0,
      "date": "2023-01-02",
      "stock_price": 150.25,
      "portfolio_value": 1502.50,
      "gain_loss": 0.00,
      "gain_loss_percent": 0.00,
      "stock_change": 0.00,
      "stock_change_percent": 0.00,
      "initial_investment": 1502.50
    },
    // ... more weeks
  ],
  "total_weeks": 52
}
```

### 2. Get Person Portfolio (Multiple Stocks)

eg: /api/person-portfolio

```
POST /api/person-portfolio
Content-Type: application/json

{
  "name": "Alex Chen",
  "transactions": [
    {
      "ticker": "AAPL",
      "dateBought": "2023-02-01",
      "sharesBought": 50,
      "purchasePrice": 150.25
    }
  ]
}
```

### 3. Get All People Data
```
GET /api/people-data
```

### 4. Health Check
```
GET /health
```

## 🎯 Key Features

- **Real Stock Data**: Uses Yahoo Finance (yfinance) for actual historical prices
- **Week-by-Week Analysis**: Shows performance progression from purchase date to now
- **Person vs Stock Performance**: Separates individual performance from overall stock movement
- **CORS Enabled**: Ready for frontend integration
- **Minimal & Fast**: Focused only on essential functionality

## 📈 Data Returned

For each week since purchase, you get:

1. **Person Performance**:
   - Portfolio value at that week
   - Gain/loss from initial investment
   - Percentage return

2. **Stock Performance**:
   - Stock price at that week
   - Price change from purchase date
   - Percentage change

## 🔧 Example Usage

```bash
# Get AAPL performance since Feb 1, 2023 (10 shares)
curl "http://localhost:5000/api/stock-performance?ticker=AAPL&date=2023-02-01&shares=10"



curl "http://localhost:5000/api/stock-performance?ticker=AAPL&date=2023-02-01&shares=10"

# Health check
curl "http://localhost:5000/health"
```

