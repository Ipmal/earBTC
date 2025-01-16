import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Bitcoin, Wallet, Settings, LogOut, Menu, X, Home, Eye, Link as LinkIcon, Droplets, Users } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ViewAds from './pages/ViewAds';
import ShortLinks from './pages/ShortLinks';
import Faucet from './pages/Faucet';
import Referrals from './pages/Referrals';

function App() {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 bg-blue-900/50 border-b border-blue-800 backdrop-blur-sm z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Bitcoin className="w-6 h-6 text-yellow-500" />
                <span className="text-xl font-bold">earnBTC</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">0.00025 BTC</span>
                  </div>
                  <button 
                    onClick={() => setShowWithdrawModal(true)}
                    className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-400 transition"
                  >
                    Withdraw
                  </button>
                </div>
                <button className="flex items-center space-x-2 hover:text-yellow-500 transition">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="flex items-center space-x-2 hover:text-yellow-500 transition">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-blue-800/50 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/90 z-40 md:hidden pt-[73px]">
            <div className="p-4">
              <div className="flex items-center justify-between p-4 bg-blue-900/30 rounded-lg mb-4">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">0.00025 BTC</span>
                </div>
                <button 
                  onClick={() => setShowWithdrawModal(true)}
                  className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  Withdraw
                </button>
              </div>
              <NavLinks onItemClick={closeMobileMenu} />
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:block fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 bg-blue-900/30 border-r border-blue-800 backdrop-blur-sm z-30">
          <nav className="p-4">
            <NavLinks />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="pt-[73px] md:pl-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/view-ads" element={<ViewAds />} />
            <Route path="/short-links" element={<ShortLinks />} />
            <Route path="/faucet" element={<Faucet />} />
            <Route path="/referrals" element={<Referrals />} />
          </Routes>
        </main>

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-blue-900 rounded-xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Withdraw to FaucetPay</h2>
                <button 
                  onClick={() => setShowWithdrawModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">FaucetPay Username</label>
                  <input 
                    type="text"
                    placeholder="Enter your FaucetPay username"
                    className="w-full bg-blue-800/50 border border-blue-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Amount (BTC)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      placeholder="0.00000000"
                      step="0.00000001"
                      min="0.00001000"
                      max="0.00025000"
                      className="w-full bg-blue-800/50 border border-blue-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-yellow-500 hover:text-yellow-400">
                      MAX
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Minimum: 0.00001000 BTC</p>
                </div>

                <div className="bg-blue-800/30 rounded-lg p-4 text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Available Balance</span>
                    <span>0.00025 BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Network Fee</span>
                    <span>0.00000100 BTC</span>
                   </div>
                </div>

                <button className="w-full bg-yellow-500 text-black py-3 rounded-lg font-medium hover:bg-yellow-400 transition">
                  Withdraw to FaucetPay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

function NavLinks({ onItemClick }: { onItemClick?: () => void }) {
  const location = useLocation();
  const links = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/view-ads', icon: Eye, label: 'View Ads' },
    { path: '/short-links', icon: LinkIcon, label: 'Short Links' },
    { path: '/faucet', icon: Droplets, label: 'Faucet' },
    { path: '/referrals', icon: Users, label: 'Referrals' },
  ];

  return (
    <div className="space-y-2">
      {links.map(({ path, icon: Icon, label }) => (
        <Link
          key={path}
          to={path}
          onClick={onItemClick}
          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition ${
            location.pathname === path ? 'bg-blue-800/50 text-yellow-500' : 'hover:bg-blue-800/30'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}

export default App;