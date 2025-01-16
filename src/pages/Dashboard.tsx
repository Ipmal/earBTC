import React from 'react';
import { DollarSign, Eye, Users, Link as LinkIcon, Droplets } from 'lucide-react';

// Calculate total earnings from all sources
const earnings = {
  ads: 0.00002, // From ViewAds (2 completed ads)
  links: 0.00002, // From ShortLinks (2 completed links)
  faucet: 0.000015, // From Faucet claims
  referrals: 0.0001 // From Referral commissions
};

const totalEarnings = Object.values(earnings).reduce((a, b) => a + b, 0);

// Available tasks count
const availableTasks = {
  ads: 4, // From ViewAds (4 ads available)
  links: 4, // From ShortLinks (4 links available)
  faucet: 1, // Faucet (if cooldown is complete)
  total: 9
};

// Active referrals from Referrals page
const activeReferrals = 2;

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-blue-800/30 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">Total Earnings</h3>
            <DollarSign className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">₿ {totalEarnings.toFixed(8)}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs bg-blue-900/50 text-gray-300 px-2 py-1 rounded">
              Ads: ₿ {earnings.ads.toFixed(8)}
            </span>
            <span className="text-xs bg-blue-900/50 text-gray-300 px-2 py-1 rounded">
              Links: ₿ {earnings.links.toFixed(8)}
            </span>
            <span className="text-xs bg-blue-900/50 text-gray-300 px-2 py-1 rounded">
              Faucet: ₿ {earnings.faucet.toFixed(8)}
            </span>
            <span className="text-xs bg-blue-900/50 text-gray-300 px-2 py-1 rounded">
              Referrals: ₿ {earnings.referrals.toFixed(8)}
            </span>
          </div>
        </div>
        <div className="bg-blue-800/30 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">Available Tasks</h3>
            <Eye className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">{availableTasks.total}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs bg-blue-900/50 text-gray-300 px-2 py-1 rounded flex items-center">
              <Eye className="w-3 h-3 mr-1" /> {availableTasks.ads} ads
            </span>
            <span className="text-xs bg-blue-900/50 text-gray-300 px-2 py-1 rounded flex items-center">
              <LinkIcon className="w-3 h-3 mr-1" /> {availableTasks.links} links
            </span>
            <span className="text-xs bg-blue-900/50 text-gray-300 px-2 py-1 rounded flex items-center">
              <Droplets className="w-3 h-3 mr-1" /> {availableTasks.faucet} faucet
            </span>
          </div>
        </div>
        <div className="bg-blue-800/30 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">Active Referrals</h3>
            <Users className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">{activeReferrals}</p>
          <p className="text-sm text-green-400 mt-2">Earned ₿ {earnings.referrals.toFixed(8)} total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-blue-800/30 rounded-xl p-4 md:p-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                type: 'ad',
                description: 'Watched Crypto Exchange Ad',
                amount: 0.00001,
                time: '2 minutes ago'
              },
              {
                type: 'link',
                description: 'Visited Bitcoin Analysis Link',
                amount: 0.00002,
                time: '15 minutes ago'
              },
              {
                type: 'faucet',
                description: 'Faucet Claim',
                amount: 0.000015,
                time: '30 minutes ago'
              },
              {
                type: 'referral',
                description: 'Referral Commission from user123',
                amount: 0.00003,
                time: '45 minutes ago'
              }
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-blue-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-700/50 flex items-center justify-center">
                    {activity.type === 'ad' && <Eye className="w-4 h-4" />}
                    {activity.type === 'link' && <LinkIcon className="w-4 h-4" />}
                    {activity.type === 'faucet' && <Droplets className="w-4 h-4" />}
                    {activity.type === 'referral' && <Users className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-400">{activity.time}</p>
                  </div>
                </div>
                <span className="text-yellow-500">+₿ {activity.amount.toFixed(8)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-800/30 rounded-xl p-4 md:p-6">
          <h3 className="text-lg font-medium mb-4">Earnings Chart</h3>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-gray-400">Chart will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  );
}