"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ShoppingCart, Plus, Tag } from "lucide-react"
import { useWriteContract, useReadContract } from "wagmi"

interface MarketplaceSectionProps {
  contractAddress?: string
}

export function MarketplaceSection({ contractAddress }: MarketplaceSectionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [listingTokenId, setListingTokenId] = useState("")
  const [listingPrice, setListingPrice] = useState("")
  
  const { writeContract } = useWriteContract()
  
  const { data: _activeListings } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "getActiveListings",
        "outputs": [{"name": "", "type": "uint256[]"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "getActiveListings",
  })

  const { data: listingCount } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "getListingCount",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "getListingCount",
  })

  // Mock marketplace data - in real app, you'd fetch this from contract
  const mockListings = [
    {
      id: 1,
      tokenId: 1,
      seller: "0x123...abc",
      price: "0.05",
      createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      isActive: true,
      nft: {
        name: "Skadi Genesis #1",
        description: "The first NFT in the Skadi collection",
        imageUri: "https://via.placeholder.com/300x300/6366f1/ffffff?text=Skadi+1"
      }
    },
    {
      id: 2,
      tokenId: 2,
      seller: "0x456...def",
      price: "0.08",
      createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
      isActive: true,
      nft: {
        name: "Skadi Genesis #2",
        description: "A unique NFT with special traits",
        imageUri: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Skadi+2"
      }
    },
    {
      id: 3,
      tokenId: 3,
      seller: "0x789...ghi",
      price: "0.12",
      createdAt: Date.now() - 3 * 60 * 60 * 1000, // 3 hours ago
      isActive: true,
      nft: {
        name: "Skadi Genesis #3",
        description: "Rare NFT with exclusive features",
        imageUri: "https://via.placeholder.com/300x300/ec4899/ffffff?text=Skadi+3"
      }
    }
  ]

  const handleCreateListing = async () => {
    if (!contractAddress || !listingTokenId || !listingPrice) return
    
    setIsLoading(true)
    try {
      const price = BigInt(Math.floor(parseFloat(listingPrice) * 1e18))
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: [
          {
            "inputs": [
              {"name": "tokenId", "type": "uint256"},
              {"name": "price", "type": "uint256"}
            ],
            "name": "createListing",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        functionName: "createListing",
        args: [BigInt(listingTokenId), price],
      })
      setListingTokenId("")
      setListingPrice("")
      setShowCreateForm(false)
    } catch (error) {
      console.error("Failed to create listing:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBuyListing = async (listingId: number, price: string) => {
    if (!contractAddress) return
    
    setIsLoading(true)
    try {
      const priceInWei = BigInt(Math.floor(parseFloat(price) * 1e18))
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: [
          {
            "inputs": [{"name": "listingId", "type": "uint256"}],
            "name": "buyListing",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          }
        ],
        functionName: "buyListing",
        args: [BigInt(listingId)],
        value: priceInWei,
      })
    } catch (error) {
      console.error("Failed to buy listing:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            <CardTitle>Marketplace</CardTitle>
          </div>
          <Button
            size="sm"
            onClick={() => setShowCreateForm(!showCreateForm)}
            disabled={!contractAddress}
          >
            <Plus className="h-4 w-4 mr-2" />
            List NFT
          </Button>
        </div>
        <CardDescription>
          Buy and sell NFTs in the marketplace
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Active Listings</span>
          </div>
          <span className="text-lg font-bold text-green-600">
            {listingCount ? Number(listingCount).toLocaleString() : "0"}
          </span>
        </div>

        {showCreateForm && (
          <div className="p-4 border border-secondary-200 rounded-lg space-y-3">
            <h3 className="font-semibold">List Your NFT</h3>
            <div>
              <label className="text-sm font-medium text-secondary-700">Token ID</label>
              <input
                type="number"
                value={listingTokenId}
                onChange={(e) => setListingTokenId(e.target.value)}
                placeholder="Enter NFT token ID"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-secondary-700">Price (ETH)</label>
              <input
                type="number"
                step="0.001"
                min="0.001"
                value={listingPrice}
                onChange={(e) => setListingPrice(e.target.value)}
                placeholder="0.01"
                className="input-field"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCreateListing}
                loading={isLoading}
                disabled={!listingTokenId || !listingPrice}
              >
                Create Listing
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockListings.map((listing) => (
            <div key={listing.id} className="border border-secondary-200 rounded-lg overflow-hidden">
              <div className="aspect-square bg-secondary-100 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={listing.nft.imageUri} 
                  alt={listing.nft.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-secondary-900 truncate">
                  {listing.nft.name}
                </h3>
                <p className="text-sm text-secondary-600 mt-1 line-clamp-2">
                  {listing.nft.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <div className="text-lg font-bold text-secondary-800">
                      {listing.price} ETH
                    </div>
                    <div className="text-xs text-secondary-500">
                      by {listing.seller}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleBuyListing(listing.id, listing.price)}
                    loading={isLoading}
                    disabled={!contractAddress}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Buy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockListings.length === 0 && (
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-secondary-600">No NFTs listed for sale</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
