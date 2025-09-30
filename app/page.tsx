"use client";
import { useState, useEffect } from "react";
import { sdk } from '@farcaster/miniapp-sdk'
import { useRouter } from "next/navigation";
import { minikitConfig } from "../minikit.config";
import { WaitlistSection } from "@/components/contracts/WaitlistSection";
import { PointsSection } from "@/components/contracts/PointsSection";
import { StakingSection } from "@/components/contracts/StakingSection";
import { NFTSection } from "@/components/contracts/NFTSection";
import { RewardsSection } from "@/components/contracts/RewardsSection";
import { GovernanceSection } from "@/components/contracts/GovernanceSection";
import { MarketplaceSection } from "@/components/contracts/MarketplaceSection";
import { LeaderboardSection } from "@/components/contracts/LeaderboardSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
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
  Zap
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
    { id: "waitlist", label: "Waitlist", icon: Users, component: WaitlistSection, color: "bg-blue-500", description: "Join the community" },
    { id: "points", label: "Points", icon: Star, component: PointsSection, color: "bg-yellow-500", description: "Earn rewards" },
    { id: "staking", label: "Staking", icon: Lock, component: StakingSection, color: "bg-green-500", description: "Stake & earn" },
    { id: "nft", label: "NFTs", icon: Palette, component: NFTSection, color: "bg-purple-500", description: "Create & collect" },
    { id: "rewards", label: "Rewards", icon: Gift, component: RewardsSection, color: "bg-pink-500", description: "Claim prizes" },
    { id: "governance", label: "Vote", icon: Vote, component: GovernanceSection, color: "bg-orange-500", description: "Shape the future" },
    { id: "marketplace", label: "Market", icon: ShoppingCart, component: MarketplaceSection, color: "bg-indigo-500", description: "Buy & sell" },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy, component: LeaderboardSection, color: "bg-red-500", description: "Top performers" },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/success")}
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white text-lg">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Navigation
                </CardTitle>
                <CardDescription className="text-white/70">
                  Explore all features of Skadi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <div
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group cursor-pointer transition-all duration-200 ${
                        isActive 
                          ? 'bg-white/20 scale-105' 
                          : 'hover:bg-white/10 hover:scale-102'
                      } rounded-xl p-4 border border-white/10`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${tab.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${isActive ? 'text-white' : 'text-white/90'}`}>
                            {tab.label}
                          </h3>
                          <p className="text-xs text-white/60">{tab.description}</p>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border-white/20 mt-6">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Community Stats</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-white">1,234</p>
                      <p className="text-xs text-white/70">Members</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">56.7K</p>
                      <p className="text-xs text-white/70">Points</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Header Card */}
              <div className="xl:col-span-2">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">
                      {tabs.find(tab => tab.id === activeTab)?.label}
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      {tabs.find(tab => tab.id === activeTab)?.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Main Component */}
              <div className="xl:col-span-2">
                {ActiveComponent ? (
                  <ActiveComponent 
                    contractAddress={
                      activeTab === "waitlist" ? process.env.NEXT_PUBLIC_WAITLIST_CONTRACT :
                      activeTab === "points" ? process.env.NEXT_PUBLIC_POINTS_CONTRACT :
                      activeTab === "staking" ? process.env.NEXT_PUBLIC_STAKING_CONTRACT :
                      activeTab === "nft" ? process.env.NEXT_PUBLIC_NFT_CONTRACT :
                      activeTab === "rewards" ? process.env.NEXT_PUBLIC_REWARD_CONTRACT :
                      activeTab === "governance" ? process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT :
                      activeTab === "marketplace" ? process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT :
                      "0x0000000000000000000000000000000000000000" // Fallback address
                    }
                  />
                ) : (
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Coming Soon</CardTitle>
                      <CardDescription className="text-white/70">
                        This feature is under development
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">🚧</span>
                        </div>
                        <p className="text-white/70">
                          We&apos;re working hard to bring you this feature soon!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Additional Info Cards */}
              <div className="xl:col-span-1">
                <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">Quick Stats</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/70">Active Users</span>
                          <span className="text-white font-semibold">1,234</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Total Points</span>
                          <span className="text-white font-semibold">56.7K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">NFTs Minted</span>
                          <span className="text-white font-semibold">892</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="xl:col-span-1">
                <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">Recent Activity</h3>
                      <div className="space-y-3 text-left">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-white/70 text-sm">New user joined</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-white/70 text-sm">Points claimed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-white/70 text-sm">NFT minted</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
