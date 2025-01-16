import React, { useState } from 'react';
import { Users, Copy, ArrowUpRight, Wallet } from 'lucide-react';

interface Referral {
  username: string;
  joinDate: number;
  earnings: number;
  lastActive: number;
  status: 'active' | 'inactive';
}

const mockReferrals: Referral[] = [
  {
    username: 'user123',
    joinDate: Date.now() - 1000 * 60 * 60 * 24 * 5,
    earnings: 0.00015,
    lastActive: Date.now() - 1000 * 60 * 30,
    status: 'active'
  },
  {
    username: 'crypto_fan',
    joinDate: Date.now() - 1000 * 60 * 60 * 24 * 10,
    earnings: 0.00025,
    lastActive: Date.now() - 1000 * 60 * 60 * 2,
    status: 'active'
  },
  {
    username: 'btc_lover',
    joinDate: Date.now() - 1000 * 60 * 60 * 24 * 15,
    earnings: 0.00010,
    lastActive: Date.now() - 1000 * 60 * 60 * 24 * 2,
    status: 'inactive'
  }
];

export default function Referrals() {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://earnbtc.example.com/?ref=yourusername';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Referral Program</h1>
        <p className="text-gray-400">Earn 20% commission from your referrals' earnings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-blue-800/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Your Referral Link</h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-blue-900/30 border border-blue-700 rounded-lg px-4 py-2 text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="bg-blue-800/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Your Referrals</h2>
            <div className="space-y-4">
              {mockReferrals.map((referral) => (
                <div 
                  key={referral.username}
                  className="flex items-center justify-between p-4 bg-blue-900/30 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center">
                      <Users className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="font-medium">{referral.username}</p>
                      <p className="text-sm text-gray-400">Joined {getTimeAgo(referral.joinDate)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-500">₿ {referral.earnings.toFixed(8)}</p>
                    <p className="text-sm text-gray-400">
                      {referral.status === 'active' ? (
                        <span className="text-green-500">● Active</span>
                      ) : (
                        <span className="text-gray-500">● Inactive</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-800/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Referral Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-900/30 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-400 mb-2">
                  <Users className="w-4 h-4" />
                  <span>Total Referrals</span>
                </div>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="bg-blue-900/30 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-400 mb-2">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Active</span>
                </div>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-800/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Commission Earnings</h2>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Wallet className="w-6 h-6 text-yellow-500" />
                <p className="text-3xl font-bold text-yellow-500">₿ 0.0001</p>
              </div>
              <p className="text-sm text-gray-400">Total earned from referrals</p>
            </div>
          </div>

          <div className="bg-blue-800/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">How It Works</h2>
            <div className="space-y-3 text-sm">
              <p className="text-gray-400">• Share your referral link with friends</p>
              <p className="text-gray-400">• Earn 20% of their earnings forever</p>
              <p className="text-gray-400">• No limit on number of referrals</p>
              <p className="text-gray-400">• Instant commission credits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}