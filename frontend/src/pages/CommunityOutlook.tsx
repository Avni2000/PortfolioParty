import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { TrendingUp, TrendingDown, DollarSign, Users, X, MessageCircle } from 'lucide-react';

interface PersonData {
  id: number;
  name: string;
  city: string;
  joinDate: string;
  transactions: Array<{
    ticker: string;
    dateBought: string;
    dateSold?: string;
    sharesBought: number;
    purchasePrice: number;
    totalInvested: number;
  }>;
}

interface PortfolioPerformance {
  name: string;
  city: string;
  joinDate: string;
  totalValue: number;
  totalGainLoss: number;
  totalInvestment: number;
  gainLossPercentage: number;
  loading: boolean;
  error?: string;
}

interface DetailedPortfolioData {
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

const CommunityOutlook = () => {
  const [portfolios, setPortfolios] = useState<PortfolioPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState<PersonData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalPortfolioData, setModalPortfolioData] = useState<DetailedPortfolioData | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    fetchCommunityData();
  }, []);

  // Transform backend portfolio data to frontend format (same as Dashboard)
  const transformPortfolioData = (backendData: any): DetailedPortfolioData | null => {
    if (!backendData || typeof backendData !== 'object') {
      return null;
    }

    const gainLossPercentage = backendData.total_investment > 0 
      ? ((backendData.total_gain_loss / backendData.total_investment) * 100)
      : 0;

    // Create weekly performance by properly combining all stocks' data
    let weeklyPerformance: Array<{ week: string; portfolioValue: number }> = [];
    if (backendData.stocks && backendData.stocks.length > 0) {
      const allDatesSet = new Set<string>();
      backendData.stocks.forEach((stock: any) => {
        if (stock.weeks_data) {
          stock.weeks_data.forEach((week: any) => {
            allDatesSet.add(week.date);
          });
        }
      });
      
      const allDates = Array.from(allDatesSet).sort();
      
      weeklyPerformance = allDates.map((date: string) => {
        let totalValue = 0;
        
        backendData.stocks.forEach((stock: any) => {
          if (stock.weeks_data) {
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

  const fetchCommunityData = async () => {
    try {
      setLoading(true);
      
      // First, fetch all people data
      const peopleResponse = await fetch('http://localhost:5000/api/people-data');
      if (!peopleResponse.ok) {
        throw new Error('Failed to fetch people data');
      }
      
      const allPeople: PersonData[] = await peopleResponse.json();
      
      // Filter for San Francisco residents only
      const sanFranciscoPeople = allPeople.filter(person => 
        person.city === 'San Francisco'
      );

      console.log(`Found ${sanFranciscoPeople.length} people in San Francisco`);
      
      // Initialize portfolio data with loading state
      const initialPortfolios: PortfolioPerformance[] = sanFranciscoPeople.map(person => ({
        name: person.name,
        city: person.city,
        joinDate: person.joinDate,
        totalValue: 0,
        totalGainLoss: 0,
        totalInvestment: 0,
        gainLossPercentage: 0,
        loading: true
      }));
      
      setPortfolios(initialPortfolios);
      
      // Fetch real-time portfolio data for each person
      const portfolioPromises = sanFranciscoPeople.map(async (person, index) => {
        try {
          // Transform transaction data for API call
          const transactions = person.transactions
            .filter(t => !t.dateSold) // Only include current holdings
            .map(t => ({
              ticker: t.ticker,
              dateBought: t.dateBought,
              sharesBought: t.sharesBought
            }));

          const portfolioResponse = await fetch('http://localhost:5000/api/person-portfolio', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: person.name,
              transactions: transactions
            })
          });

          if (!portfolioResponse.ok) {
            throw new Error(`Failed to fetch portfolio for ${person.name}`);
          }

          const portfolioData = await portfolioResponse.json();
          
          const gainLossPercentage = portfolioData.total_investment > 0 
            ? ((portfolioData.total_gain_loss / portfolioData.total_investment) * 100)
            : 0;

          return {
            name: person.name,
            city: person.city,
            joinDate: person.joinDate,
            totalValue: portfolioData.total_current_value || 0,
            totalGainLoss: portfolioData.total_gain_loss || 0,
            totalInvestment: portfolioData.total_investment || 0,
            gainLossPercentage: gainLossPercentage,
            loading: false
          };
          
        } catch (err) {
          console.error(`Error fetching portfolio for ${person.name}:`, err);
          return {
            name: person.name,
            city: person.city,
            joinDate: person.joinDate,
            totalValue: 0,
            totalGainLoss: 0,
            totalInvestment: 0,
            gainLossPercentage: 0,
            loading: false,
            error: `Failed to load portfolio data`
          };
        }
      });
      
      // Wait for all portfolio data and update state
      const portfolioResults = await Promise.all(portfolioPromises);
      
      // Sort by total gain/loss (best performers first)
      const sortedPortfolios = portfolioResults.sort((a, b) => b.totalGainLoss - a.totalGainLoss);
      
      setPortfolios(sortedPortfolios);
      setLoading(false);
      
    } catch (err) {
      console.error('Error fetching community data:', err);
      setError('Failed to load community data. Please try again.');
      setLoading(false);
    }
  };

  const handlePersonClick = async (personName: string) => {
    // Find the full person data
    const peopleResponse = await fetch('http://localhost:5000/api/people-data');
    const allPeople: PersonData[] = await peopleResponse.json();
    const person = allPeople.find(p => p.name === personName);
    
    if (!person) return;

    setSelectedPerson(person);
    setShowModal(true);
    setModalLoading(true);
    setModalPortfolioData(null);

    // Fetch detailed portfolio data for the modal
    try {
      const transactions = person.transactions
        .filter(t => !t.dateSold)
        .map(t => ({
          ticker: t.ticker,
          dateBought: t.dateBought,
          sharesBought: t.sharesBought
        }));

      const portfolioResponse = await fetch('http://localhost:5000/api/person-portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: person.name,
          transactions: transactions
        })
      });

      if (portfolioResponse.ok) {
        const portfolioData = await portfolioResponse.json();
        const transformedData = transformPortfolioData(portfolioData);
        setModalPortfolioData(transformedData);
      }
    } catch (error) {
      console.error('Error fetching detailed portfolio:', error);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPerson(null);
    setModalPortfolioData(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-20 px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl text-gray-300">Loading San Francisco community data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-20 px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <p className="text-xl text-red-400 mb-4">{error}</p>
              <button 
                onClick={fetchCommunityData}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-20 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="w-8 h-8 text-green-500" />
            <h1 className="text-4xl font-bold text-white">Community Outlook</h1>
          </div>
          <p className="text-xl text-gray-300 mb-2">
            Your Neighbors' and Friends' Real-time Portfolios
          </p>
          <div className="flex items-center space-x-2 text-gray-400">
            <span>📍 San Francisco, CA</span>
            <span>•</span>
            <span>{portfolios.length} active investors</span>
            <span>•</span>
            <span>Live market data</span>
          </div>
        </div>

        {/* Rankings List */}
        <div className="space-y-4">
          {portfolios.map((portfolio, index) => (
            <div
              key={portfolio.name}
              onClick={() => handlePersonClick(portfolio.name)}
              className={`bg-gray-900 rounded-lg p-6 border-l-4 transition-all hover:bg-gray-800 cursor-pointer hover:scale-[1.02] ${
                portfolio.totalGainLoss >= 0 
                  ? 'border-green-500' 
                  : 'border-red-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="text-2xl font-bold text-gray-400 min-w-[60px]">
                    {getRankIcon(index)}
                  </div>
                  
                  {/* Person Info */}
                  <div>
                    <h3 className="text-xl font-semibold text-white">{portfolio.name}</h3>
                    <p className="text-gray-400 text-sm">
                      📍 {portfolio.city} • Joined {new Date(portfolio.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="text-right">
                  {portfolio.loading ? (
                    <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : portfolio.error ? (
                    <div className="text-red-400 text-sm">{portfolio.error}</div>
                  ) : (
                    <div className="space-y-1">
                      {/* Total Portfolio Value */}
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-green-500" />
                        <span className="text-2xl font-bold text-white">
                          {formatCurrency(portfolio.totalValue)}
                        </span>
                      </div>
                      
                      {/* Gain/Loss */}
                      <div className={`flex items-center space-x-2 ${
                        portfolio.totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {portfolio.totalGainLoss >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="font-semibold">
                          {portfolio.totalGainLoss >= 0 ? '+' : ''}
                          {formatCurrency(portfolio.totalGainLoss)}
                        </span>
                        <span className="text-sm">
                          ({portfolio.gainLossPercentage >= 0 ? '+' : ''}
                          {portfolio.gainLossPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      
                      {/* Investment Amount */}
                      <div className="text-xs text-gray-500">
                        Invested: {formatCurrency(portfolio.totalInvestment)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-500">
              {portfolios.filter(p => p.totalGainLoss > 0).length}
            </div>
            <div className="text-gray-400">Profitable Investors</div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-white">
              {formatCurrency(
                portfolios.reduce((sum, p) => sum + p.totalValue, 0)
              )}
            </div>
            <div className="text-gray-400">Total Community Value</div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <div className={`text-3xl font-bold ${
              portfolios.reduce((sum, p) => sum + p.totalGainLoss, 0) >= 0 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}>
              {formatCurrency(
                portfolios.reduce((sum, p) => sum + p.totalGainLoss, 0)
              )}
            </div>
            <div className="text-gray-400">Total Community Gains</div>
          </div>
        </div>
      </div>

      {/* Portfolio Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
            {/* Modal Header */}
            <div className="bg-gray-900 text-white p-6 rounded-t-2xl flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedPerson?.name}'s Portfolio</h2>
                <p className="text-gray-400">
                  📍 {selectedPerson?.city} • Joined {selectedPerson ? new Date(selectedPerson.joinDate).toLocaleDateString() : ''}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 text-black">
              {modalLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading portfolio details...</p>
                  </div>
                </div>
              ) : modalPortfolioData ? (
                <div className="space-y-6">
                  {/* Portfolio Value Card */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-gray-600 text-sm mb-2">Portfolio Value</h3>
                    <div className="text-4xl font-bold mb-2">
                      {formatCurrency(modalPortfolioData.totalValue)}
                    </div>
                    <div className={`text-sm ${modalPortfolioData.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {modalPortfolioData.totalGainLoss >= 0 ? '+' : ''}{formatCurrency(modalPortfolioData.totalGainLoss)} 
                      ({modalPortfolioData.gainLossPercentage >= 0 ? '+' : ''}{modalPortfolioData.gainLossPercentage.toFixed(2)}%)
                    </div>
                  </div>

                  {/* Portfolio Chart */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Portfolio Value Over Time</h3>
                    {modalPortfolioData.weeklyPerformance && modalPortfolioData.weeklyPerformance.length > 0 ? (
                      <div className="w-full h-64 bg-white rounded border flex items-center justify-center relative overflow-hidden">
                        <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="modalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.2"/>
                              <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0"/>
                            </linearGradient>
                          </defs>
                          <path
                            d={`M 50 ${150 - (modalPortfolioData.weeklyPerformance[0]?.portfolioValue || 0) / Math.max(...modalPortfolioData.weeklyPerformance.map(p => p.portfolioValue)) * 100} ${modalPortfolioData.weeklyPerformance.map((point, index) => 
                              `L ${50 + (index * (700 / (modalPortfolioData.weeklyPerformance.length - 1)))} ${150 - (point.portfolioValue / Math.max(...modalPortfolioData.weeklyPerformance.map(p => p.portfolioValue)) * 100)}`
                            ).join(' ')}`}
                            stroke="rgb(34, 197, 94)"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path
                            d={`M 50 ${150 - (modalPortfolioData.weeklyPerformance[0]?.portfolioValue || 0) / Math.max(...modalPortfolioData.weeklyPerformance.map(p => p.portfolioValue)) * 100} ${modalPortfolioData.weeklyPerformance.map((point, index) => 
                              `L ${50 + (index * (700 / (modalPortfolioData.weeklyPerformance.length - 1)))} ${150 - (point.portfolioValue / Math.max(...modalPortfolioData.weeklyPerformance.map(p => p.portfolioValue)) * 100)}`
                            ).join(' ')} L 750 150 L 50 150 Z`}
                            fill="url(#modalGradient)"
                          />
                          {modalPortfolioData.weeklyPerformance.map((point, index) => (
                            <circle
                              key={index}
                              cx={50 + (index * (700 / (modalPortfolioData.weeklyPerformance.length - 1)))}
                              cy={150 - (point.portfolioValue / Math.max(...modalPortfolioData.weeklyPerformance.map(p => p.portfolioValue)) * 100)}
                              r="3"
                              fill="rgb(34, 197, 94)"
                              stroke="white"
                              strokeWidth="1"
                            />
                          ))}
                        </svg>
                        <div className="absolute bottom-2 left-2 text-xs text-gray-600">
                          {modalPortfolioData.weeklyPerformance.length} weeks of data
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500">No chart data available</span>
                      </div>
                    )}
                  </div>

                  {/* Asset Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Asset Breakdown</h3>
                    {modalPortfolioData.assetBreakdown && modalPortfolioData.assetBreakdown.length > 0 ? (
                      <div className="space-y-3">
                        {modalPortfolioData.assetBreakdown.map((asset, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="font-medium">{asset.ticker}</span>
                            <div className="flex items-center space-x-4">
                              <span className="text-gray-600 text-sm">{asset.shares} shares</span>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold">{formatCurrency(asset.currentValue)}</span>
                                <span className={`text-sm ${asset.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {asset.gainLoss >= 0 ? '+' : ''}{formatCurrency(asset.gainLoss)} 
                                  ({asset.gainLossPercentage >= 0 ? '+' : ''}{asset.gainLossPercentage.toFixed(1)}%)
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No asset data available
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Failed to load portfolio data
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityOutlook; 