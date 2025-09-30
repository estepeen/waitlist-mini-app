"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Users, CheckCircle, AlertCircle } from "lucide-react"
import { useWriteContract, useReadContract } from "wagmi"
import { formatEther } from "@/lib/utils"

interface WaitlistSectionProps {
  contractAddress?: string
}

export function WaitlistSection({ contractAddress }: WaitlistSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  const { writeContract } = useWriteContract()
  
  const { data: isRegistered } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [{"name": "user", "type": "address"}],
        "name": "isUserRegistered",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "isUserRegistered",
    args: contractAddress ? [contractAddress as `0x${string}`] : undefined,
  })

  const { data: registeredCount } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "getRegisteredCount",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "getRegisteredCount",
  })

  const { data: registrationFee } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "registrationFee",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "registrationFee",
  })

  const handleJoinWaitlist = async () => {
    if (!contractAddress) return
    
    setIsLoading(true)
    try {
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: [
          {
            "inputs": [],
            "name": "joinWaitlist",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          }
        ],
        functionName: "joinWaitlist",
        value: registrationFee as bigint,
      })
    } catch (error) {
      console.error("Failed to join waitlist:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-white text-xl">Join Waitlist</CardTitle>
            <CardDescription className="text-white/70">
              Be the first to experience Skadi AI assistant for NFTs
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-white font-semibold">Total Registered</span>
                <p className="text-xs text-white/60">Community members</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-white">
                {registeredCount ? Number(registeredCount).toLocaleString() : "0"}
              </span>
              <p className="text-xs text-white/60">members</p>
            </div>
          </div>

          {registrationFee && (
            <div className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-white font-semibold">Registration Fee</span>
                  <p className="text-xs text-white/60">One-time payment</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-white">
                  {formatEther(registrationFee)} ETH
                </span>
                <p className="text-xs text-white/60">required</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {isRegistered ? (
            <div className="flex items-center gap-3 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-xl border border-green-500/30">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-green-400 font-semibold text-lg">
                  You&apos;re already registered!
                </span>
                <p className="text-green-300/70 text-sm">Welcome to the community</p>
              </div>
            </div>
          ) : (
            <Button 
              onClick={handleJoinWaitlist}
              loading={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-105"
              disabled={!contractAddress}
            >
              {isLoading ? "Joining..." : "Join Waitlist"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
