"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Star, Clock, Gift } from "lucide-react"
import { useWriteContract, useReadContract } from "wagmi"
import { formatPoints } from "@/lib/utils"

interface PointsSectionProps {
  contractAddress?: string
}

export function PointsSection({ contractAddress }: PointsSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  const { writeContract } = useWriteContract()
  
  const { data: userPoints } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [{"name": "user", "type": "address"}],
        "name": "getPoints",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "getPoints",
    args: contractAddress ? [contractAddress as `0x${string}`] : undefined,
  })

  const { data: canClaim } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [{"name": "user", "type": "address"}],
        "name": "canClaim",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "canClaim",
    args: contractAddress ? [contractAddress as `0x${string}`] : undefined,
  })

  const { data: pointsPerDay } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "POINTS_PER_DAY",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "POINTS_PER_DAY",
  })

  const handleClaimPoints = async () => {
    if (!contractAddress) return
    
    setIsLoading(true)
    try {
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: [
          {
            "inputs": [],
            "name": "claimDailyPoints",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        functionName: "claimDailyPoints",
      })
    } catch (error) {
      console.error("Failed to claim points:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Star className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-white text-xl">Points System</CardTitle>
            <CardDescription className="text-white/70">
              Earn points daily and spend them on rewards
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-white font-semibold">Your Points</span>
                <p className="text-xs text-white/60">Current balance</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-white">
                {userPoints ? formatPoints(userPoints) : "0"}
              </span>
              <p className="text-xs text-white/60">points</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-white font-semibold">Daily Reward</span>
                <p className="text-xs text-white/60">Available to claim</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">
                {pointsPerDay ? formatPoints(pointsPerDay) : "10"}
              </span>
              <p className="text-xs text-white/60">points</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {canClaim ? (
            <Button 
              onClick={handleClaimPoints}
              loading={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105"
              disabled={!contractAddress}
            >
              {isLoading ? "Claiming..." : "Claim Daily Points"}
            </Button>
          ) : (
            <div className="flex items-center gap-3 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-white font-semibold">Come back tomorrow!</span>
                <p className="text-white/60 text-sm">
                  You&apos;ve already claimed your daily points
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
