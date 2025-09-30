"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Image, Plus, Palette } from "lucide-react"
import { useWriteContract, useReadContract } from "wagmi"
import { formatEther } from "@/lib/utils"

interface NFTSectionProps {
  contractAddress?: string
}

export function NFTSection({ contractAddress }: NFTSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [nftName, setNftName] = useState("")
  const [nftDescription, setNftDescription] = useState("")
  const [nftImageUri, setNftImageUri] = useState("")
  
  const { writeContract } = useWriteContract()
  
  const { data: totalSupply } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "getNFTCount",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "getNFTCount",
  })

  const { data: maxSupply } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "MAX_SUPPLY",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "MAX_SUPPLY",
  })

  const { data: mintPrice } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "MINT_PRICE",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "MINT_PRICE",
  })

  const { data: userNFTs } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [{"name": "user", "type": "address"}],
        "name": "getUserNFTs",
        "outputs": [{"name": "", "type": "uint256[]"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "getUserNFTs",
    args: contractAddress ? [contractAddress as `0x${string}`] : undefined,
  })

  const handleMintNFT = async () => {
    if (!contractAddress || !nftName || !nftDescription || !nftImageUri) return
    
    setIsLoading(true)
    try {
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: [
          {
            "inputs": [
              {"name": "_name", "type": "string"},
              {"name": "_description", "type": "string"},
              {"name": "_imageURI", "type": "string"}
            ],
            "name": "mintNFT",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "payable",
            "type": "function"
          }
        ],
        functionName: "mintNFT",
        args: [nftName, nftDescription, nftImageUri],
        value: mintPrice as bigint,
      })
      setNftName("")
      setNftDescription("")
      setNftImageUri("")
    } catch (error) {
      console.error("Failed to mint NFT:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-purple-600" />
          <CardTitle>NFT Minting</CardTitle>
        </div>
        <CardDescription>
          Create and mint your own NFTs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Image className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium">Supply</span>
          </div>
          <span className="text-lg font-bold text-purple-600">
            {totalSupply ? Number(totalSupply).toLocaleString() : "0"} / {maxSupply ? Number(maxSupply).toLocaleString() : "10,000"}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-secondary-600" />
            <span className="text-sm font-medium">Your NFTs</span>
          </div>
          <span className="text-lg font-bold text-secondary-800">
            {userNFTs ? userNFTs.length : "0"}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-secondary-700">NFT Name</label>
            <input
              type="text"
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
              placeholder="Enter NFT name"
              className="input-field"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-secondary-700">Description</label>
            <textarea
              value={nftDescription}
              onChange={(e) => setNftDescription(e.target.value)}
              placeholder="Enter NFT description"
              className="input-field min-h-[80px] resize-none"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-secondary-700">Image URI</label>
            <input
              type="url"
              value={nftImageUri}
              onChange={(e) => setNftImageUri(e.target.value)}
              placeholder="https://example.com/image.png"
              className="input-field"
            />
          </div>
        </div>

        <div className="p-4 bg-secondary-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-secondary-700">Mint Price</span>
            <span className="text-lg font-bold text-secondary-800">
              {mintPrice ? formatEther(mintPrice) : "0.01"} ETH
            </span>
          </div>
        </div>

        <Button 
          onClick={handleMintNFT}
          loading={isLoading}
          className="w-full"
          disabled={!contractAddress || !nftName || !nftDescription || !nftImageUri}
        >
          Mint NFT
        </Button>
      </CardContent>
    </Card>
  )
}
