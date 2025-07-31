import { useState } from 'react';
import Header from '../components/Header';

interface BackendPortfolioData {
  name: string;
  total_current_value: number;
  total_gain_loss: number;
  total_investment: number;
  stocks: Array<{
    ticker: string;
    shares: number;
    purchase_price: number;
    current_price: number;
    weeks_data: Array<{
      week: number;
      date: string;
      stock_price: number;
      portfolio_value: number;
      gain_loss: number;
      gain_loss_percent: number;
    }>;
  }>;
}

interface PortfolioData {
  name: string;
  totalValue: number;
  totalGainLoss: number;
  gainLossPercentage: number;
  weeklyPerformance: Array<{
    week: string;
    portfolioValue: number;
  }>;
  assetBreakdown: Array<{
    ticker: string;
    shares: number;
    currentValue: number;
    gainLoss: number;
    gainLossPercentage: number;
  }>;
}

// Helper function to transform backend data to frontend format
const transformPortfolioData = (backendData: BackendPortfolioData): PortfolioData | null => {
  if (!backendData || typeof backendData !== 'object') {
    return null;
  }

  // Calculate gain/loss percentage
  const gainLossPercentage = backendData.total_investment > 0 
    ? ((backendData.total_gain_loss / backendData.total_investment) * 100)
    : 0;

  // Create weekly performance by properly combining all stocks' data
  let weeklyPerformance: Array<{ week: string; portfolioValue: number }> = [];
  if (backendData.stocks && backendData.stocks.length > 0) {
    // Collect all unique dates across all stocks
    const allDatesSet = new Set<string>();
    backendData.stocks.forEach((stock: any) => {
      if (stock.weeks_data) {
        stock.weeks_data.forEach((week: any) => {
          allDatesSet.add(week.date);
        });
      }
    });
    
    // Convert to sorted array
    const allDates = Array.from(allDatesSet).sort();
    
    // For each date, calculate total portfolio value
    weeklyPerformance = allDates.map((date: string) => {
      let totalValue = 0;
      
      backendData.stocks.forEach((stock: any) => {
        if (stock.weeks_data) {
          // Find the data for this specific date
          const weekData = stock.weeks_data.find((week: any) => week.date === date);
          if (weekData) {
            totalValue += weekData.portfolio_value || 0;
          }
        }
      });
      
      return {
        week: date,
        portfolioValue: totalValue
      };
    });
  }

  // Create asset breakdown from stocks data
  const assetBreakdown = (backendData.stocks || []).map((stock: any) => {
    const lastWeek = stock.weeks_data && stock.weeks_data.length > 0 
      ? stock.weeks_data[stock.weeks_data.length - 1] 
      : {};
    
    return {
      ticker: stock.ticker || 'Unknown',
      shares: stock.shares || 0,
      currentValue: lastWeek.portfolio_value || 0,
      gainLoss: lastWeek.gain_loss || 0,
      gainLossPercentage: lastWeek.gain_loss_percent || 0
    };
  });

  return {
    name: backendData.name || 'Unknown',
    totalValue: backendData.total_current_value || 0,
    totalGainLoss: backendData.total_gain_loss || 0,
    gainLossPercentage: gainLossPercentage,
    weeklyPerformance: weeklyPerformance,
    assetBreakdown: assetBreakdown
  };
};

const Dashboard = () => {
  const [isIntegrating, setIsIntegrating] = useState(false);
  const [isIntegrated, setIsIntegrated] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  // Mock data as fallback
  const mockPortfolioData: PortfolioData = {
    name: "You",
    totalValue: 47850.75,
    totalGainLoss: 8350.75,
    gainLossPercentage: 21.14, // Mock for percentage calculation
    weeklyPerformance: [
      { week: "2024-01-15", portfolioValue: 1000 },
      { week: "2024-01-22", portfolioValue: 1050 },
      { week: "2024-01-29", portfolioValue: 1020 },
      { week: "2024-02-05", portfolioValue: 1080 },
      { week: "2024-02-12", portfolioValue: 1100 },
      { week: "2024-02-19", portfolioValue: 1120 },
      { week: "2024-02-26", portfolioValue: 1150 },
      { week: "2024-03-05", portfolioValue: 1180 },
      { week: "2024-03-12", portfolioValue: 1200 },
      { week: "2024-03-19", portfolioValue: 1220 },
      { week: "2024-03-26", portfolioValue: 1250 },
      { week: "2024-04-02", portfolioValue: 1280 }
    ],
    assetBreakdown: [
      { ticker: "NVDA", shares: 20, currentValue: 1000, gainLoss: 0, gainLossPercentage: 0 },
      { ticker: "AAPL", shares: 50, currentValue: 7500, gainLoss: 0, gainLossPercentage: 0 },
      { ticker: "MSFT", shares: 25, currentValue: 5000, gainLoss: 0, gainLossPercentage: 0 },
      { ticker: "GOOGL", shares: 15, currentValue: 4500, gainLoss: 0, gainLossPercentage: 0 },
      { ticker: "TSLA", shares: 30, currentValue: 12000, gainLoss: 0, gainLossPercentage: 0 }
    ]
  };

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/person-portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "You",
          transactions: [
            {
              ticker: "NVDA",
              dateBought: "2024-01-15",
              sharesBought: 20
            },
            {
              ticker: "AAPL", 
              dateBought: "2024-02-01",
              sharesBought: 50
            },
            {
              ticker: "MSFT",
              dateBought: "2024-03-10", 
              sharesBought: 25
            },
            {
              ticker: "GOOGL",
              dateBought: "2024-04-15",
              sharesBought: 15
            },
            {
              ticker: "TSLA",
              dateBought: "2024-05-20",
              sharesBought: 30
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const transformedData = transformPortfolioData(data);
        if (transformedData) {
          setPortfolioData(transformedData);
        } else {
          console.log('Invalid data format from backend, using mock data');
          setPortfolioData(mockPortfolioData);
        }
      } else {
        console.log('Backend not available, using mock data');
        setPortfolioData(mockPortfolioData);
      }
    } catch (error) {
      console.log('Error fetching portfolio data, using mock data:', error);
      setPortfolioData(mockPortfolioData);
    }
  };

  const handleRobinhoodIntegration = async () => {
    setIsIntegrating(true);
    
    // Simulate multi-step integration process
    await new Promise(resolve => setTimeout(resolve, 1500)); // Authentication
    await new Promise(resolve => setTimeout(resolve, 1000)); // Data fetching
    
    // Fetch real portfolio data
    await fetchPortfolioData();
    
    await new Promise(resolve => setTimeout(resolve, 500));  // Final processing
    
    setIsIntegrating(false);
    setIsIntegrated(true);
    
    // Scroll to dashboard content after integration
    setTimeout(() => {
      const dashboardContent = document.getElementById('dashboard-content');
      if (dashboardContent) {
        dashboardContent.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      {/* Main Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Welcome to Portfolio Party
          </h1>
         
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            {!isIntegrated ? 
              "Connect your Robinhood account to get started with real portfolio data." :
              "Manage your portfolio and engage with your community."
            }
          </p>

          {!isIntegrated && (
            <div className="flex flex-col items-center space-y-6">
              <button
                onClick={handleRobinhoodIntegration}
                disabled={isIntegrating}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-3 ${
                  isIntegrating
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 hover:scale-105'
                } text-white shadow-lg`}
              >
                {isIntegrating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Connecting to Robinhood...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <span>Connect with Robinhood</span>
                  </>
                )}
              </button>
              
              {isIntegrating && (
                <div className="space-y-2">
                  <div className="text-gray-400 text-sm animate-pulse">
                    Securely authenticating your account...
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-green-500 h-1 rounded-full animate-pulse" style={{width: '70%'}}></div>
                  </div>
                </div>
              )}

              {!isIntegrating && !isIntegrated && (
                <div className="text-gray-500 text-xs max-w-md">
                  Your login credentials are encrypted and secure. We only access portfolio data you authorize.
                </div>
              )}
            </div>
          )}

          {isIntegrated && (
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold">Connected to Robinhood</span>
            </div>
          )}
        </div>
      </section>

      {/* Dashboard Content */}
      {isIntegrated && (
        <section id="dashboard-content" className="px-6 py-12 max-w-7xl mx-auto">
          {/* Success Message */}
          <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 border border-green-500/50 rounded-xl p-6 mb-8 animate-fade-in">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-green-400 font-bold text-lg">🎉 Successfully Connected to Robinhood!</h3>
                <p className="text-gray-300">Your portfolio data has been synced and is ready to view. Scroll down to explore your dashboard.</p>
              </div>
              <div className="text-green-400 font-mono text-sm bg-green-900/30 px-3 py-1 rounded-full">
                LIVE DATA
              </div>
            </div>
          </div>

          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Portfolio Value Card */}
            <div className="bg-white rounded-lg p-6 text-black lg:col-span-1">
              <h3 className="text-gray-600 text-sm mb-2">Portfolio Value</h3>
              <div className="text-6xl font-bold mb-2">
                {portfolioData ? `$${portfolioData.totalValue.toLocaleString()}` : '$0.00'}
              </div>
              <div className={`text-sm ${portfolioData && portfolioData.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolioData ? 
                  `${portfolioData.totalGainLoss >= 0 ? '+' : ''}$${portfolioData.totalGainLoss.toLocaleString()} (${portfolioData.gainLossPercentage >= 0 ? '+' : ''}${portfolioData.gainLossPercentage.toFixed(2)}%)` :
                  'Loading...'
                }
              </div>
            </div>

            {/* Market Overview */}
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white text-sm">Dow Jones</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-sm">38,664</div>
                    <div className="text-green-500 text-xs">+0.52%</div>
                  </div>
                </div>
               
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white text-sm">S&P 500</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-sm">5,462</div>
                    <div className="text-green-500 text-xs">+0.53%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white text-sm">NASDAQ</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-sm">17,663</div>
                    <div className="text-green-500 text-xs">+1.1%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row - Portfolio Chart */}
          <div className="mb-6">
            <div className="bg-white rounded-lg p-6 text-black min-h-[400px] flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Portfolio Value Over Time</h3>
              {portfolioData && portfolioData.weeklyPerformance ? (
                <div className="flex-1 h-full">
                  <div className="w-full h-80 bg-gray-50 rounded border-2 border-dashed border-gray-200 flex items-center justify-center relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.2"/>
                          <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      {/* Generate path based on portfolio data */}
                      <path
                        d={`M 50 ${250 - (portfolioData.weeklyPerformance[0]?.portfolioValue || 0) / Math.max(...portfolioData.weeklyPerformance.map(p => p.portfolioValue)) * 200} ${portfolioData.weeklyPerformance.map((point, index) => 
                          `L ${50 + (index * (700 / (portfolioData.weeklyPerformance.length - 1)))} ${250 - (point.portfolioValue / Math.max(...portfolioData.weeklyPerformance.map(p => p.portfolioValue)) * 200)}`
                        ).join(' ')}`}
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="3"
                        fill="none"
                      />
                      <path
                        d={`M 50 ${250 - (portfolioData.weeklyPerformance[0]?.portfolioValue || 0) / Math.max(...portfolioData.weeklyPerformance.map(p => p.portfolioValue)) * 200} ${portfolioData.weeklyPerformance.map((point, index) => 
                          `L ${50 + (index * (700 / (portfolioData.weeklyPerformance.length - 1)))} ${250 - (point.portfolioValue / Math.max(...portfolioData.weeklyPerformance.map(p => p.portfolioValue)) * 200)}`
                        ).join(' ')} L 750 250 L 50 250 Z`}
                        fill="url(#gradient)"
                      />
                      {/* Data points */}
                      {portfolioData.weeklyPerformance.map((point, index) => (
                        <circle
                          key={index}
                          cx={50 + (index * (700 / (portfolioData.weeklyPerformance.length - 1)))}
                          cy={250 - (point.portfolioValue / Math.max(...portfolioData.weeklyPerformance.map(p => p.portfolioValue)) * 200)}
                          r="4"
                          fill="rgb(34, 197, 94)"
                          stroke="white"
                          strokeWidth="2"
                        />
                      ))}
                    </svg>
                    <div className="absolute bottom-4 left-4 text-sm text-gray-600">
                      Timeline: {portfolioData.weeklyPerformance.length} weeks of data
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 h-full bg-gray-100 rounded flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <span className="text-gray-500">Loading chart data...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row - Asset Breakdown */}
          <div className="grid grid-cols-1 w-full mx-auto">
            <div className="bg-white rounded-lg p-6 text-black">
              <h3 className="text-lg font-semibold mb-4">Asset Breakdown</h3>
              {portfolioData && portfolioData.assetBreakdown ? (
                <div className="space-y-3">
                  {portfolioData.assetBreakdown.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{asset.ticker}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600 text-sm">{asset.shares} shares</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">${asset.currentValue.toLocaleString()}</span>
                          <span className={`text-sm ${asset.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {asset.gainLoss >= 0 ? '+' : ''}${asset.gainLoss.toLocaleString()} ({asset.gainLossPercentage >= 0 ? '+' : ''}{asset.gainLossPercentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <span className="text-gray-500 text-sm">Loading asset data...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;

