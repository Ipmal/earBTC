import React, { useState, useEffect } from 'react';
import { Droplets, Clock, History } from 'lucide-react';

interface Claim {
  timestamp: number;
  amount: number;
}

const COOLDOWN_TIME = 300; // 5 minutes in seconds
const MIN_REWARD = 0.00000100;
const MAX_REWARD = 0.00001000;

export default function Faucet() {
  const [lastClaim, setLastClaim] = useState<number>(() => {
    const saved = localStorage.getItem('lastClaim');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [claims, setClaims] = useState<Claim[]>(() => {
    const saved = localStorage.getItem('claims');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const nextClaimTime = lastClaim + COOLDOWN_TIME;
      const remaining = Math.max(0, nextClaimTime - now);
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastClaim]);

  useEffect(() => {
    localStorage.setItem('claims', JSON.stringify(claims));
  }, [claims]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const claim = () => {
    const reward = MIN_REWARD + Math.random() * (MAX_REWARD - MIN_REWARD);
    const now = Math.floor(Date.now() / 1000);
    
    setLastClaim(now);
    localStorage.setItem('lastClaim', now.toString());
    
    setClaims(prev => [{
      timestamp: now,
      amount: reward
    }, ...prev.slice(0, 9)]);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Bitcoin Faucet</h1>
        <p className="text-gray-400">Claim free BTC every 5 minutes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blue-800/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-blue-700/50 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Claim BTC</h2>
                <p className="text-sm text-gray-400">₿ {MIN_REWARD.toFixed(8)} - {MAX_REWARD.toFixed(8)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-5 h-5" />
              <span>5 min cooldown</span>
            </div>
          </div>

          {timeLeft > 0 ? (
            <div className="bg-blue-900/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span>Next claim available in:</span>
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <div className="bg-blue-800/50 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((COOLDOWN_TIME - timeLeft) / COOLDOWN_TIME) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <button
              onClick={claim}
              className="w-full bg-yellow-500 text-black py-4 rounded-lg font-medium hover:bg-yellow-400 transition mb-4"
            >
              Claim Now
            </button>
          )}

          <div className="text-sm text-gray-400">
            <p>• Rewards are random between {MIN_REWARD.toFixed(8)} and {MAX_REWARD.toFixed(8)} BTC</p>
            <p>• Claims are automatically paid to your account balance</p>
            <p>• Maximum 10 claims per day</p>
          </div>
        </div>

        <div className="bg-blue-800/30 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <History className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-semibold">Recent Claims</h2>
          </div>
          
          <div className="space-y-3">
            {claims.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No recent claims</p>
            ) : (
              claims.map((claim, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-blue-700/50">
                  <div>
                    <p className="text-yellow-500">₿ {claim.amount.toFixed(8)}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(claim.timestamp * 1000).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">
                    {Math.floor((Date.now() / 1000 - claim.timestamp) / 60)} mins ago
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}