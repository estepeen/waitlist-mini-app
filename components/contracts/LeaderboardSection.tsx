"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Trophy, Medal, Star, Users, TrendingUp, Award } from "lucide-react"
// import { useReadContract } from "wagmi"
import { formatAddress, formatPoints } from "@/lib/utils"

interface LeaderboardSectionProps {
  contractAddress?: string
}

interface LeaderboardEntry {
  address: string
  points: number
  nfts: number
  staked: number
  referrals: number
  rank: number
}

export function LeaderboardSection({ contractAddress: _contractAddress }: LeaderboardSectionProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState<"all" | "month" | "week">("all")
  const [isLoading, setIsLoading] = useState(true)

  // Mock leaderboard data - in real app, you'd fetch this from contract or API
  const mockLeaderboardData: LeaderboardEntry[] = useMemo(() => [
    {
      address: "0x123...abc",
      points: 2500,
      nfts: 15,
      staked: 2.5,
      referrals: 8,
      rank: 1
    },
    {
      address: "0x456...def",
      points: 2200,
      nfts: 12,
      staked: 2.0,
      referrals: 6,
      rank: 2
    },
    {
      address: "0x789...ghi",
      points: 1950,
      nfts: 10,
      staked: 1.8,
      referrals: 5,
      rank: 3
    },
    {
      address: "0xabc...123",
      points: 1800,
      nfts: 9,
      staked: 1.5,
      referrals: 4,
      rank: 4
    },
    {
      address: "0xdef...456",
      points: 1650,
      nfts: 8,
      staked: 1.2,
      referrals: 3,
      rank: 5
    },
    {
      address: "0xghi...789",
      points: 1500,
      nfts: 7,
      staked: 1.0,
      referrals: 2,
      rank: 6
    },
    {
      address: "0x234...567",
      points: 1350,
      nfts: 6,
      staked: 0.8,
      referrals: 2,
      rank: 7
    },
    {
      address: "0x567...890",
      points: 1200,
      nfts: 5,
      staked: 0.6,
      referrals: 1,
      rank: 8
    }
  ], [])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLeaderboardData(mockLeaderboardData)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [selectedPeriod, mockLeaderboardData])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Medal className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-secondary-600">#{rank}</span>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-50 border-yellow-200"
      case 2:
        return "bg-gray-50 border-gray-200"
      case 3:
        return "bg-amber-50 border-amber-200"
      default:
        return "bg-white border-secondary-200"
    }
  }

  const periods = [
    { id: "all", label: "All Time", icon: Trophy },
    { id: "month", label: "This Month", icon: TrendingUp },
    { id: "week", label: "This Week", icon: Star }
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
          <CardTitle>Leaderboard</CardTitle>
        </div>
        <CardDescription>
          Top performers in the Skadi ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Period Selector */}
        <div className="flex gap-2 p-1 bg-secondary-100 rounded-lg">
          {periods.map((period) => {
            const Icon = period.icon
            return (
              <Button
                key={period.id}
                size="sm"
                variant={selectedPeriod === period.id ? "primary" : "ghost"}
                onClick={() => setSelectedPeriod(period.id as "all" | "month" | "week")}
                className="flex-1"
              >
                <Icon className="h-4 w-4 mr-1" />
                {period.label}
              </Button>
            )
          })}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-secondary-50 rounded-lg text-center">
            <Users className="h-5 w-5 text-secondary-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-secondary-800">
              {leaderboardData.length}
            </div>
            <div className="text-xs text-secondary-600">Total Users</div>
          </div>
          <div className="p-3 bg-secondary-50 rounded-lg text-center">
            <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-secondary-800">
              {leaderboardData.length > 0 ? formatPoints(leaderboardData[0].points.toString()) : "0"}
            </div>
            <div className="text-xs text-secondary-600">Top Score</div>
          </div>
          <div className="p-3 bg-secondary-50 rounded-lg text-center">
            <Award className="h-5 w-5 text-purple-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-secondary-800">
              {leaderboardData.reduce((sum, user) => sum + user.nfts, 0)}
            </div>
            <div className="text-xs text-secondary-600">Total NFTs</div>
          </div>
          <div className="p-3 bg-secondary-50 rounded-lg text-center">
            <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-secondary-800">
              {leaderboardData.reduce((sum, user) => sum + user.staked, 0).toFixed(1)}
            </div>
            <div className="text-xs text-secondary-600">Total Staked</div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-2">
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-4 bg-secondary-100 rounded-lg animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-secondary-200 rounded"></div>
                      <div className="w-24 h-4 bg-secondary-200 rounded"></div>
                    </div>
                    <div className="w-16 h-4 bg-secondary-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            leaderboardData.map((user) => (
              <div
                key={user.address}
                className={`p-4 rounded-lg border ${getRankColor(user.rank)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(user.rank)}
                    </div>
                    <div>
                      <div className="font-medium text-secondary-900">
                        {formatAddress(user.address)}
                      </div>
                      <div className="text-xs text-secondary-600">
                        {user.nfts} NFTs • {user.staked} ETH staked • {user.referrals} referrals
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-secondary-800">
                      {formatPoints(user.points.toString())}
                    </div>
                    <div className="text-xs text-secondary-600">points</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!isLoading && leaderboardData.length === 0 && (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-secondary-600">No leaderboard data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
