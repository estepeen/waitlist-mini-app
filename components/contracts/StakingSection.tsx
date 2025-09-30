"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Lock, TrendingUp, Clock } from "lucide-react"
import { useWriteContract, useReadContract } from "wagmi"
import { formatEther } from "@/lib/utils"

interface StakingSectionProps {
  contractAddress?: string
}

export function StakingSection({ contractAddress }: StakingSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [stakeAmount, setStakeAmount] = useState("")
  
  const { writeContract } = useWriteContract()
  
  const { data: totalStaked } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [{"name": "user", "type": "address"}],
        "name": "totalStaked",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "totalStaked",
    args: contractAddress ? [contractAddress as `0x${string}`] : undefined,
  })

  const { data: minStake } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "MIN_STAKE",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "MIN_STAKE",
  })

  const { data: rewardRate } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "REWARD_RATE",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "REWARD_RATE",
  })

  const { data: lockPeriod } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "LOCK_PERIOD",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "LOCK_PERIOD",
  })

  const handleStake = async () => {
    if (!contractAddress || !stakeAmount) return
    
    setIsLoading(true)
    try {
      const amount = BigInt(Math.floor(parseFloat(stakeAmount) * 1e18))
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: [
          {
            "inputs": [],
            "name": "stake",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          }
        ],
        functionName: "stake",
        value: amount,
      })
      setStakeAmount("")
    } catch (error) {
      console.error("Failed to stake:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-green-600" />
          <CardTitle>Staking</CardTitle>
        </div>
        <CardDescription>
          Stake ETH and earn 5% APY rewards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Your Staked</span>
          </div>
          <span className="text-lg font-bold text-green-600">
            {totalStaked ? formatEther(totalStaked) : "0"} ETH
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-secondary-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-secondary-600" />
              <span className="text-sm font-medium">APY</span>
            </div>
            <span className="text-xl font-bold text-secondary-800">
              {rewardRate ? `${rewardRate}%` : "5%"}
            </span>
          </div>
          
          <div className="p-4 bg-secondary-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-secondary-600" />
              <span className="text-sm font-medium">Lock Period</span>
            </div>
            <span className="text-xl font-bold text-secondary-800">
              {lockPeriod ? `${Number(lockPeriod) / (24 * 60 * 60)} days` : "30 days"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-secondary-700">
            Stake Amount (ETH)
          </label>
          <input
            type="number"
            step="0.01"
            min={minStake ? formatEther(minStake) : "0.01"}
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder={`Min: ${minStake ? formatEther(minStake) : "0.01"} ETH`}
            className="input-field"
          />
        </div>

        <Button 
          onClick={handleStake}
          loading={isLoading}
          className="w-full"
          disabled={!contractAddress || !stakeAmount || parseFloat(stakeAmount) < (minStake ? parseFloat(formatEther(minStake)) : 0.01)}
        >
          Stake ETH
        </Button>
      </CardContent>
    </Card>
  )
}
