import React, { useState, useEffect } from 'react';
import { Link as LinkIcon, ExternalLink, Clock, CheckCircle } from 'lucide-react';

interface ShortLink {
  id: number;
  title: string;
  reward: number;
  timer: number;
  url: string;
  completed: boolean;
}

const mockLinks: ShortLink[] = [
  {
    id: 1,
    title: "Crypto News Article",
    reward: 0.00001,
    timer: 10,
    url: "https://example.com/crypto-news",
    completed: false
  },
  {
    id: 2,
    title: "Bitcoin Analysis",
    reward: 0.00002,
    timer: 15,
    url: "https://example.com/btc-analysis",
    completed: false
  },
  {
    id: 3,
    title: "Trading Tips",
    reward: 0.00001,
    timer: 12,
    url: "https://example.com/trading-tips",
    completed: false
  },
  {
    id: 4,
    title: "Market Update",
    reward: 0.00002,
    timer: 20,
    url: "https://example.com/market-update",
    completed: false
  }
];

export default function ShortLinks() {
  const [links, setLinks] = useState<ShortLink[]>(mockLinks);
  const [activeTimers, setActiveTimers] = useState<Record<number, number>>({});

  useEffect(() => {
    const timers: Record<string, NodeJS.Timeout> = {};

    Object.entries(activeTimers).forEach(([linkId, timeLeft]) => {
      if (timeLeft > 0) {
        timers[linkId] = setInterval(() => {
          setActiveTimers(prev => ({
            ...prev,
            [linkId]: prev[linkId] - 1
          }));
        }, 1000);
      }
    });

    return () => {
      Object.values(timers).forEach(timer => clearInterval(timer));
    };
  }, [activeTimers]);

  const startTimer = (linkId: number, duration: number) => {
    setActiveTimers(prev => ({
      ...prev,
      [linkId]: duration
    }));
  };

  const handleLinkComplete = (linkId: number) => {
    setLinks(prev =>
      prev.map(link =>
        link.id === linkId ? { ...link, completed: true } : link
      )
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Short Links</h1>
        <p className="text-gray-400">Visit links to earn BTC. New links added regularly.</p>
      </div>

      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="bg-blue-800/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-700/50 flex items-center justify-center">
                  <LinkIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{link.title}</h3>
                  <span className="text-yellow-500 text-sm">₿ {link.reward.toFixed(8)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{link.timer}s</span>
                </div>
              </div>
            </div>

            {activeTimers[link.id] ? (
              <div className="bg-blue-900/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span>Preparing link...</span>
                  <span>{activeTimers[link.id]}s</span>
                </div>
                <div className="bg-blue-800/50 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(activeTimers[link.id] / link.timer) * 100}%` }}
                  />
                </div>
              </div>
            ) : link.completed ? (
              <button 
                disabled
                className="w-full flex items-center justify-center space-x-2 bg-green-500/20 text-green-500 py-3 rounded-lg"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Completed</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  startTimer(link.id, link.timer);
                  setTimeout(() => {
                    window.open(link.url, '_blank');
                    handleLinkComplete(link.id);
                  }, link.timer * 1000);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-yellow-500 text-black py-3 rounded-lg hover:bg-yellow-400 transition"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Visit Link</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}