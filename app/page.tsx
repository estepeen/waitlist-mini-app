"use client";
import { useState, useEffect } from "react";
import { sdk } from '@farcaster/miniapp-sdk'
import { useRouter } from "next/navigation";
import { minikitConfig } from "../minikit.config";
import { 
  Users, 
  Star, 
  Lock, 
  Palette, 
  Gift, 
  Vote, 
  ShoppingCart, 
  Trophy,
  X,
  Menu,
  Sparkles,
  Calendar,
  Clock,
  TrendingUp
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("waitlist");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Initialize the Farcaster miniapp
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const tabs = [
    { id: "waitlist", label: "Waitlist", icon: Users, color: "bg-blue-500", description: "Join the community" },
    { id: "points", label: "Points", icon: Star, color: "bg-yellow-500", description: "Earn rewards" },
    { id: "staking", label: "Staking", icon: Lock, color: "bg-green-500", description: "Stake & earn" },
    { id: "nft", label: "NFTs", icon: Palette, color: "bg-purple-500", description: "Create & collect" },
    { id: "rewards", label: "Rewards", icon: Gift, color: "bg-pink-500", description: "Claim prizes" },
    { id: "governance", label: "Vote", icon: Vote, color: "bg-orange-500", description: "Shape the future" },
    { id: "marketplace", label: "Market", icon: ShoppingCart, color: "bg-indigo-500", description: "Buy & sell" },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy, color: "bg-red-500", description: "Top performers" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {minikitConfig.frame.name}
                </h1>
                <p className="text-xs text-white/70">AI Assistant for NFTs</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <button
                onClick={() => router.push("/success")}
                className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <div
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMenuOpen(false);
                    }}
                    className={`group cursor-pointer transition-all duration-200 ${
                      isActive 
                        ? 'bg-white/20 scale-105' 
                        : 'hover:bg-white/10 hover:scale-102'
                    } rounded-xl p-3 border border-white/10`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${tab.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-white/90'}`}>
                          {tab.label}
                        </h3>
                        <p className="text-xs text-white/60">{tab.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    // navigate to subpage
                    router.push(`/${tab.id}`);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Points Card */}
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Points</h3>
              <p className="text-white/70 text-sm">Earn rewards daily</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-white">56.7K</span>
                <p className="text-xs text-white/60">Total Points</p>
              </div>
            </div>
          </div>

          {/* Main Feature Card */}
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div className="bg-green-500/30 rounded-lg px-3 py-1 mb-4 inline-block">
                <span className="text-green-300 text-xs font-semibold">2nd Place</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Weekly Challenge</h3>
              <p className="text-white/70 text-sm mb-4">$10k USDC prize pool</p>
              <div className="flex justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="h-4 w-4 text-white/70 mr-2" />
                <span className="text-white/70 text-sm">Ends on Oct 5, 2025</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Prediction Market</h3>
              <p className="text-white/70 text-sm mb-4">Will Skadi reach 150M users by Oct 5?</p>
              <div className="text-right">
                <span className="text-2xl font-bold text-white">99.85%</span>
                <p className="text-xs text-white/60">Confidence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">All Trending Markets</h2>
            <div className="flex space-x-2">
              {['Trending', 'Ending Soon', 'High Value', 'Newest', 'LP Rewards'].map((filter) => (
                <button
                  key={filter}
                  className="px-3 py-1 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Market Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* BTC Price Prediction */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white font-semibold text-sm leading-tight">
                  $BTC above $107,648.69 on Oct 6?
                </h3>
                <div className="bg-green-500/20 rounded-full px-2 py-1">
                  <span className="text-green-300 text-xs font-semibold">99.8%</span>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-blue-400">99.85%</span>
                <p className="text-white/60 text-sm">Chance</p>
              </div>

              {/* Mock Chart */}
              <div className="h-16 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-lg mb-4 flex items-end justify-center">
                <div className="w-full h-full bg-gradient-to-r from-blue-500/30 to-green-500/30 rounded-lg flex items-center justify-center">
                  <span className="text-white/50 text-xs">Chart</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white/70 text-xs">Operational</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-500/20 text-green-300 rounded text-xs hover:bg-green-500/30 transition-colors">
                    YES
                  </button>
                  <button className="px-3 py-1 bg-red-500/20 text-red-300 rounded text-xs hover:bg-red-500/30 transition-colors">
                    NO
                  </button>
                </div>
              </div>
            </div>

            {/* F1 Constructors */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
              <h3 className="text-white font-semibold mb-4">F1 Constructors Champion</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">McLaren</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">99.3%</span>
                    <div className="flex gap-1">
                      <button className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">YES</button>
                      <button className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">NO</button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Other</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">0.4%</span>
                    <div className="flex gap-1">
                      <button className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">YES</button>
                      <button className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">NO</button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Red Bull Racing</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">0.2%</span>
                    <div className="flex gap-1">
                      <button className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">YES</button>
                      <button className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">NO</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/10">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-white font-semibold">5,164,344 USDC</span>
              </div>
            </div>

            {/* Another BTC Prediction */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white font-semibold text-sm leading-tight">
                  $BTC above $109,891.37 on Oct 6?
                </h3>
                <div className="bg-green-500/20 rounded-full px-2 py-1">
                  <span className="text-green-300 text-xs font-semibold">99.7%</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-white/70" />
                <span className="text-white/70 text-sm">13h:53m:13s</span>
              </div>

              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-white font-semibold">166,112 USDC</span>
              </div>

              <div className="flex gap-2 justify-center">
                <button className="px-4 py-2 bg-green-500/20 text-green-300 rounded hover:bg-green-500/30 transition-colors">
                  YES
                </button>
                <button className="px-4 py-2 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition-colors">
                  NO
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Tab Content */}
        <div className="mb-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">
                {tabs.find(tab => tab.id === activeTab)?.label} - Coming Soon
              </h3>
              <p className="text-white/70 max-w-md mx-auto">
                We&apos;re working hard to bring you this feature soon! Check back later for updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}