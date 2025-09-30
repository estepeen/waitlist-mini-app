"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Vote, Plus, CheckCircle, XCircle, Clock } from "lucide-react"
import { useWriteContract, useReadContract } from "wagmi"
import { formatPoints } from "@/lib/utils"

interface GovernanceSectionProps {
  contractAddress?: string
}

export function GovernanceSection({ contractAddress }: GovernanceSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [proposalTitle, setProposalTitle] = useState("")
  const [proposalDescription, setProposalDescription] = useState("")
  
  const { writeContract } = useWriteContract()
  
  const { data: votingPower } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [{"name": "user", "type": "address"}],
        "name": "votingPower",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "votingPower",
    args: contractAddress ? [contractAddress as `0x${string}`] : undefined,
  })

  const { data: _proposalCount } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "getProposalCount",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "getProposalCount",
  })

  // Mock proposals data - in real app, you'd fetch this from contract
  const mockProposals = [
    {
      id: 1,
      title: "Increase daily points reward",
      description: "Proposal to increase daily points from 10 to 15 points per day",
      votesFor: 150,
      votesAgainst: 50,
      startTime: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      endTime: Date.now() + 5 * 24 * 60 * 60 * 1000, // 5 days from now
      proposer: "0x123...abc",
      executed: false,
      active: true
    },
    {
      id: 2,
      title: "Add new NFT collection",
      description: "Proposal to add a new NFT collection with unique traits",
      votesFor: 200,
      votesAgainst: 75,
      startTime: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
      endTime: Date.now() + 6 * 24 * 60 * 60 * 1000, // 6 days from now
      proposer: "0x456...def",
      executed: false,
      active: true
    }
  ]

  const handleCreateProposal = async () => {
    if (!contractAddress || !proposalTitle || !proposalDescription) return
    
    setIsLoading(true)
    try {
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: [
          {
            "inputs": [
              {"name": "_title", "type": "string"},
              {"name": "_description", "type": "string"}
            ],
            "name": "createProposal",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        functionName: "createProposal",
        args: [proposalTitle, proposalDescription],
      })
      setProposalTitle("")
      setProposalDescription("")
      setShowCreateForm(false)
    } catch (error) {
      console.error("Failed to create proposal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async (proposalId: number, support: boolean) => {
    if (!contractAddress) return
    
    setIsLoading(true)
    try {
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: [
          {
            "inputs": [
              {"name": "proposalId", "type": "uint256"},
              {"name": "support", "type": "bool"}
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        functionName: "vote",
        args: [BigInt(proposalId), support],
      })
    } catch (error) {
      console.error("Failed to vote:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimeRemaining = (endTime: number) => {
    const now = Date.now()
    const remaining = endTime - now
    if (remaining <= 0) return "Ended"
    
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000))
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    
    return `${days}d ${hours}h left`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Vote className="h-5 w-5 text-blue-600" />
            <CardTitle>Governance</CardTitle>
          </div>
          <Button
            size="sm"
            onClick={() => setShowCreateForm(!showCreateForm)}
            disabled={!contractAddress}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Proposal
          </Button>
        </div>
        <CardDescription>
          Participate in community governance and voting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Vote className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Your Voting Power</span>
          </div>
          <span className="text-lg font-bold text-blue-600">
            {votingPower ? formatPoints(votingPower) : "0"} votes
          </span>
        </div>

        {showCreateForm && (
          <div className="p-4 border border-secondary-200 rounded-lg space-y-3">
            <h3 className="font-semibold">Create New Proposal</h3>
            <div>
              <label className="text-sm font-medium text-secondary-700">Title</label>
              <input
                type="text"
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
                placeholder="Enter proposal title"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-700">Description</label>
              <textarea
                value={proposalDescription}
                onChange={(e) => setProposalDescription(e.target.value)}
                placeholder="Enter proposal description"
                className="input-field min-h-[100px] resize-none"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCreateProposal}
                loading={isLoading}
                disabled={!proposalTitle || !proposalDescription}
              >
                Create Proposal
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {mockProposals.map((proposal) => {
            const totalVotes = proposal.votesFor + proposal.votesAgainst
            const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0
            const isActive = proposal.active && Date.now() < proposal.endTime
            
            return (
              <div key={proposal.id} className="p-4 border border-secondary-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900">{proposal.title}</h3>
                    <p className="text-sm text-secondary-600 mt-1">{proposal.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-secondary-500">
                      <span>By: {proposal.proposer}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimeRemaining(proposal.endTime)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Votes For: {proposal.votesFor}</span>
                    <span>Votes Against: {proposal.votesAgainst}</span>
                  </div>
                  
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${forPercentage}%` }}
                    />
                  </div>
                  
                  <div className="text-xs text-secondary-500 text-center">
                    {forPercentage.toFixed(1)}% in favor
                  </div>
                </div>
                
                {isActive && (
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      onClick={() => handleVote(proposal.id, true)}
                      loading={isLoading}
                      disabled={!contractAddress}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Vote For
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleVote(proposal.id, false)}
                      loading={isLoading}
                      disabled={!contractAddress}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Vote Against
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {mockProposals.length === 0 && (
          <div className="text-center py-8">
            <Vote className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-secondary-600">No active proposals</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
