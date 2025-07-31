from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app)

def get_weekly_performance(ticker, purchase_date, shares, purchase_price=None):
    """
    Fetch real historical data and calculate week-by-week performance
    """
    try:
        # Parse the purchase date
        start_date = datetime.strptime(purchase_date, '%Y-%m-%d')
        end_date = datetime.now()
        
        print(f"DEBUG: Fetching data for {ticker} from {start_date} to {end_date}")
        
        # Fetch historical data from Yahoo Finance
        stock = yf.Ticker(ticker)
        
        # Try different intervals if weekly doesn't work
        hist = stock.history(start=start_date, end=end_date, interval="1wk")
        
        if hist.empty:
            print(f"DEBUG: Weekly data empty for {ticker}, trying daily data")
            # Try daily data as fallback
            hist = stock.history(start=start_date, end=end_date, interval="1d")
            
            if hist.empty:
                print(f"DEBUG: Daily data also empty for {ticker}")
                # Try with a wider date range
                wider_start = start_date - timedelta(days=30)
                hist = stock.history(start=wider_start, end=end_date, interval="1d")
                
                if hist.empty:
                    return {"error": f"No data found for ticker {ticker}. Please verify the ticker symbol is correct."}
                else:
                    print(f"DEBUG: Found data with wider date range for {ticker}")
        
        print(f"DEBUG: Found {len(hist)} data points for {ticker}")
        print(f"DEBUG: Date range: {hist.index[0]} to {hist.index[-1]}")
        
        # Get the purchase price if not provided
        if purchase_price is None:
            # Use the first available close price as purchase price
            purchase_price = hist['Close'].iloc[0]
        
        weekly_data = []
        weeks_since_purchase = 0
        
        # If we have daily data, we need to resample to weekly or use a different approach
        if len(hist) > 0 and (end_date - start_date).days < 7:
            # For very recent purchases, just use the available data
            for date, row in hist.iterrows():
                current_price = row['Close']
                portfolio_value = current_price * shares
                initial_investment = purchase_price * shares
                
                gain_loss = portfolio_value - initial_investment
                gain_loss_percent = (gain_loss / initial_investment) * 100 if initial_investment > 0 else 0
                
                # Stock performance (price change from purchase)
                stock_change = current_price - purchase_price
                stock_change_percent = (stock_change / purchase_price) * 100 if purchase_price > 0 else 0
                
                weekly_data.append({
                    "week": weeks_since_purchase,
                    "date": date.strftime('%Y-%m-%d'),
                    "stock_price": round(current_price, 2),
                    "portfolio_value": round(portfolio_value, 2),
                    "gain_loss": round(gain_loss, 2),
                    "gain_loss_percent": round(gain_loss_percent, 2),
                    "stock_change": round(stock_change, 2),
                    "stock_change_percent": round(stock_change_percent, 2),
                    "initial_investment": round(initial_investment, 2)
                })
                
                weeks_since_purchase += 1
        else:
            # Use weekly data or resample daily to weekly
            if '1wk' in str(hist.index.freq) if hasattr(hist.index, 'freq') else False:
                # Already weekly data
                for date, row in hist.iterrows():
                    current_price = row['Close']
                    portfolio_value = current_price * shares
                    initial_investment = purchase_price * shares
                    
                    gain_loss = portfolio_value - initial_investment
                    gain_loss_percent = (gain_loss / initial_investment) * 100 if initial_investment > 0 else 0
                    
                    # Stock performance (price change from purchase)
                    stock_change = current_price - purchase_price
                    stock_change_percent = (stock_change / purchase_price) * 100 if purchase_price > 0 else 0
                    
                    weekly_data.append({
                        "week": weeks_since_purchase,
                        "date": date.strftime('%Y-%m-%d'),
                        "stock_price": round(current_price, 2),
                        "portfolio_value": round(portfolio_value, 2),
                        "gain_loss": round(gain_loss, 2),
                        "gain_loss_percent": round(gain_loss_percent, 2),
                        "stock_change": round(stock_change, 2),
                        "stock_change_percent": round(stock_change_percent, 2),
                        "initial_investment": round(initial_investment, 2)
                    })
                    
                    weeks_since_purchase += 1
            else:
                # Resample daily to weekly
                weekly_hist = hist.resample('W').agg({
                    'Open': 'first',
                    'High': 'max',
                    'Low': 'min',
                    'Close': 'last',
                    'Volume': 'sum'
                }).dropna()
                
                # Filter out any dates beyond today (handle timezone differences)
                weekly_hist = weekly_hist[weekly_hist.index.tz_localize(None) <= end_date]
                
                for date, row in weekly_hist.iterrows():
                    current_price = row['Close']
                    portfolio_value = current_price * shares
                    initial_investment = purchase_price * shares
                    
                    gain_loss = portfolio_value - initial_investment
                    gain_loss_percent = (gain_loss / initial_investment) * 100 if initial_investment > 0 else 0
                    
                    # Stock performance (price change from purchase)
                    stock_change = current_price - purchase_price
                    stock_change_percent = (stock_change / purchase_price) * 100 if purchase_price > 0 else 0
                    
                    weekly_data.append({
                        "week": weeks_since_purchase,
                        "date": date.strftime('%Y-%m-%d'),
                        "stock_price": round(current_price, 2),
                        "portfolio_value": round(portfolio_value, 2),
                        "gain_loss": round(gain_loss, 2),
                        "gain_loss_percent": round(gain_loss_percent, 2),
                        "stock_change": round(stock_change, 2),
                        "stock_change_percent": round(stock_change_percent, 2),
                        "initial_investment": round(initial_investment, 2)
                    })
                    
                    weeks_since_purchase += 1
        
        return {
            "ticker": ticker,
            "purchase_date": purchase_date,
            "shares": shares,
            "purchase_price": round(purchase_price, 2),
            "current_price": round(hist['Close'].iloc[-1], 2),
            "weeks_data": weekly_data,
            "total_weeks": len(weekly_data)
        }
        
    except Exception as e:
        print(f"DEBUG: Exception for {ticker}: {str(e)}")
        return {"error": f"Error processing {ticker}: {str(e)}"}

@app.route('/api/stock-performance', methods=['GET'])
def stock_performance():
    """
    API endpoint to get week-by-week stock performance
    Query parameters:
    - ticker: Stock ticker (required)
    - date: Purchase date in YYYY-MM-DD format (required)
    - shares: Number of shares (required)
    # - price: Purchase price per share (optional, will fetch from historical data if not provided)
    """
    ticker = request.args.get('ticker', '').upper()
    purchase_date = request.args.get('date', '')
    shares = request.args.get('shares', type=int)
    # purchase_price = request.args.get('price', type=float)
    
    if not ticker or not purchase_date or not shares:
        return jsonify({
            "error": "Missing required parameters. Need: ticker, date, shares"
        }), 400
    
    result = get_weekly_performance(ticker, purchase_date, shares)
    return jsonify(result)

@app.route('/api/person-portfolio', methods=['POST'])
def person_portfolio():
    """
    API endpoint to get portfolio performance for a person with multiple stocks
    Expects JSON body with person's transaction data
    """
    try:
        data = request.get_json()
        person_name = data.get('name', 'Unknown')
        transactions = data.get('transactions', [])
        
        portfolio_performance = {
            "name": person_name,
            "stocks": [],
            "total_investment": 0,
            "total_current_value": 0,
            "total_gain_loss": 0
        }
        for transaction in transactions:
            if transaction.get('dateSold'):
                continue  # Skip sold positions
                
            ticker = transaction.get('ticker')
            date = transaction.get('dateBought')
            shares = transaction.get('sharesBought')
            
            if ticker and date and shares:
                stock_data = get_weekly_performance(ticker, date, shares)
                if 'error' not in stock_data:
                    portfolio_performance["stocks"].append(stock_data)
                    
                    # Add to totals
                    last_week = stock_data["weeks_data"][-1] if stock_data["weeks_data"] else {}
                    portfolio_performance["total_investment"] += last_week.get("initial_investment", 0)
                    portfolio_performance["total_current_value"] += last_week.get("portfolio_value", 0)
                    portfolio_performance["total_gain_loss"] += last_week.get("gain_loss", 0)
        
        return jsonify(portfolio_performance)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/people-data', methods=['GET'])
def get_people_data():
    """
    Load and return the people data from JSON file
    """
    try:
        with open('persondata/people_stock_data.json', 'r') as f:
            people_data = json.load(f)
        return jsonify(people_data)
    except Exception as e:
        return jsonify({"error": f"Could not load people data: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Portfolio Party Backend is running!"})

if __name__ == '__main__':
    print("Portfolio Party Backend Starting...")
    print("Real-time stock data API ready!")
    print("Server running on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000) 