"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Gift, Star, CheckCircle, Clock } from "lucide-react"
import { useWriteContract, useReadContract } from "wagmi"
import { formatPoints } from "@/lib/utils"

interface RewardsSectionProps {
  contractAddress?: string
}

export function RewardsSection({ contractAddress }: RewardsSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedReward, setSelectedReward] = useState<number | null>(null)
  
  const { writeContract } = useWriteContract()
  
  const { data: userPoints } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [{"name": "user", "type": "address"}],
        "name": "getUserPoints",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "getUserPoints",
    args: contractAddress ? [contractAddress as `0x${string}`] : undefined,
  })

  const { data: _availableRewards } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "getAvailableRewards",
        "outputs": [{"name": "", "type": "uint256[]"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "getAvailableRewards",
  })

  // Mock reward data - in real app, you'd fetch this from contract
  const mockRewards = [
    {
      id: 1,
      name: "Premium Badge",
      description: "Exclusive premium badge for your profile",
      pointsRequired: 100,
      availableQuantity: 50,
      totalQuantity: 100,
      isActive: true
    },
    {
      id: 2,
      name: "Early Access",
      description: "Get early access to new features",
      pointsRequired: 250,
      availableQuantity: 25,
      totalQuantity: 50,
      isActive: true
    },
    {
      id: 3,
      name: "VIP Status",
      description: "VIP status with special privileges",
      pointsRequired: 500,
      availableQuantity: 10,
      totalQuantity: 20,
      isActive: true
    }
  ]

  const handleClaimReward = async (rewardId: number) => {
    if (!contractAddress) return
    
    setIsLoading(true)
    setSelectedReward(rewardId)
    try {
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: [
          {
            "inputs": [{"name": "rewardId", "type": "uint256"}],
            "name": "claimReward",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        functionName: "claimReward",
        args: [BigInt(rewardId)],
      })
    } catch (error) {
      console.error("Failed to claim reward:", error)
    } finally {
      setIsLoading(false)
      setSelectedReward(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-pink-600" />
          <CardTitle>Rewards Shop</CardTitle>
        </div>
        <CardDescription>
          Spend your points on exclusive rewards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-pink-600" />
            <span className="text-sm font-medium">Your Points</span>
          </div>
          <span className="text-2xl font-bold text-pink-600">
            {userPoints ? formatPoints(userPoints) : "0"}
          </span>
        </div>

        <div className="space-y-3">
          {mockRewards.map((reward) => {
            const canAfford = userPoints ? Number(userPoints) >= reward.pointsRequired : false
            const isClaiming = selectedReward === reward.id && isLoading
            
            return (
              <div key={reward.id} className="p-4 border border-secondary-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-secondary-900">{reward.name}</h3>
                    <p className="text-sm text-secondary-600 mt-1">{reward.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-secondary-800">
                      {formatPoints(reward.pointsRequired.toString())} pts
                    </div>
                    <div className="text-xs text-secondary-500">
                      {reward.availableQuantity} left
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {canAfford ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-secondary-400" />
                    )}
                    <span className={`text-sm ${canAfford ? 'text-green-600' : 'text-secondary-500'}`}>
                      {canAfford ? 'Available' : 'Need more points'}
                    </span>
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => handleClaimReward(reward.id)}
                    loading={isClaiming}
                    disabled={!canAfford || !contractAddress || reward.availableQuantity === 0}
                  >
                    Claim
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {mockRewards.length === 0 && (
          <div className="text-center py-8">
            <Gift className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-secondary-600">No rewards available at the moment</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
