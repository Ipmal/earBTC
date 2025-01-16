import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface Ad {
  id: number;
  title: string;
  thumbnail: string;
  reward: number;
  duration: number;
  completed: boolean;
}

const mockAds: Ad[] = [
  {
    id: 1,
    title: "Crypto Exchange Ad",
    thumbnail: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&auto=format",
    reward: 0.00001,
    duration: 30,
    completed: false
  },
  {
    id: 2,
    title: "NFT Marketplace",
    thumbnail: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=500&auto=format",
    reward: 0.00002,
    duration: 45,
    completed: false
  },
  {
    id: 3,
    title: "DeFi Platform",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&auto=format",
    reward: 0.00001,
    duration: 20,
    completed: false
  },
  {
    id: 4,
    title: "Web3 Game",
    thumbnail: "https://images.unsplash.com/photo-1616489953149-8b5b0b3b3b1c?w=500&auto=format",
    reward: 0.00003,
    duration: 60,
    completed: false
  }
];

export default function ViewAds() {
  const [ads, setAds] = useState<Ad[]>(mockAds);
  const [activeAd, setActiveAd] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [adBlockerDetected, setAdBlockerDetected] = useState<boolean>(false);

  useEffect(() => {
    // Check for ad blocker
    const checkAdBlocker = async () => {
      try {
        // Create a bait element that ad blockers typically target
        const bait = document.createElement('div');
        bait.className = 'ad-unit sponsored-content advertisement';
        bait.style.position = 'absolute';
        bait.style.left = '-999px';
        document.body.appendChild(bait);

        // Wait a brief moment for ad blockers to act
        await new Promise(resolve => setTimeout(resolve, 100));

        // Check if the bait element was hidden or removed
        const isBlocked = !bait.offsetParent || 
                         !bait.offsetHeight || 
                         !bait.offsetLeft || 
                         !bait.offsetTop || 
                         !bait.offsetWidth ||
                         window.getComputedStyle(bait).display === 'none';

        setAdBlockerDetected(isBlocked);
        document.body.removeChild(bait);
      } catch (error) {
        setAdBlockerDetected(true);
      }
    };

    checkAdBlocker();

    // Cleanup
    return () => {
      const bait = document.querySelector('.ad-unit');
      if (bait) {
        document.body.removeChild(bait);
      }
    };
  }, []);

  useEffect(() => {
    let timer: number;
    if (activeAd !== null && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && activeAd !== null) {
      setAds((prevAds) =>
        prevAds.map((ad) =>
          ad.id === activeAd ? { ...ad, completed: true } : ad
        )
      );
      setActiveAd(null);
    }
    return () => clearInterval(timer);
  }, [activeAd, timeLeft]);

  const startWatching = (adId: number, duration: number) => {
    if (adBlockerDetected) {
      return;
    }
    setActiveAd(adId);
    setTimeLeft(duration);
  };

  if (adBlockerDetected) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-500 mb-2">Ad Blocker Detected</h2>
          <p className="text-gray-300 mb-4">
            Please disable your ad blocker to earn BTC by watching ads.
          </p>
          <div className="bg-blue-900/30 rounded-lg p-4 text-left text-sm space-y-2">
            <p className="text-gray-400">How to disable your ad blocker:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-300">
              <li>Click the ad blocker icon in your browser's toolbar</li>
              <li>Find the option to pause or disable the ad blocker</li>
              <li>Refresh this page to start earning</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">View Ads</h1>
        <p className="text-gray-400">Watch ads to earn BTC. New ads available daily.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-blue-800/30 rounded-xl overflow-hidden">
            <div className="relative">
              <img 
                src={ad.thumbnail} 
                alt={ad.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{ad.title}</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-yellow-500">₿ {ad.reward.toFixed(8)}</span>
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{ad.duration}s</span>
                </div>
              </div>

              {activeAd === ad.id ? (
                <div className="bg-blue-900/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span>Watching...</span>
                    <span>{timeLeft}s remaining</span>
                  </div>
                  <div className="mt-2 bg-blue-800/50 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(timeLeft / ad.duration) * 100}%` }}
                    />
                  </div>
                </div>
              ) : ad.completed ? (
                <button 
                  disabled
                  className="w-full flex items-center justify-center space-x-2 bg-green-500/20 text-green-500 py-3 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Completed</span>
                </button>
              ) : (
                <button
                  onClick={() => startWatching(ad.id, ad.duration)}
                  className="w-full flex items-center justify-center space-x-2 bg-yellow-500 text-black py-3 rounded-lg hover:bg-yellow-400 transition"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Now</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}