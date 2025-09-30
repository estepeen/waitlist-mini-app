// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MarketplaceContract {
    struct Listing {
        uint256 listingId;
        uint256 tokenId;
        address seller;
        uint256 price;
        bool isActive;
        uint256 createdAt;
    }
    
    mapping(uint256 => Listing) public listings;
    mapping(address => uint256[]) public userListings;
    
    uint256 public listingCount;
    uint256 public constant PLATFORM_FEE = 250; // 2.5% (250/10000)
    uint256 public constant MIN_PRICE = 0.001 ether;
    
    event ListingCreated(uint256 indexed listingId, uint256 indexed tokenId, address indexed seller, uint256 price, uint256 timestamp);
    event ListingSold(uint256 indexed listingId, address indexed buyer, uint256 price, uint256 timestamp);
    event ListingCancelled(uint256 indexed listingId, uint256 timestamp);
    
    function createListing(uint256 tokenId, uint256 price) external returns (uint256) {
        require(price >= MIN_PRICE, "Price too low");
        // Note: In a real implementation, you'd check if the caller owns the NFT
        
        listingCount++;
        listings[listingCount] = Listing({
            listingId: listingCount,
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            isActive: true,
            createdAt: block.timestamp
        });
        
        userListings[msg.sender].push(listingCount);
        
        emit ListingCreated(listingCount, tokenId, msg.sender, price, block.timestamp);
        return listingCount;
    }
    
    function buyListing(uint256 listingId) external payable {
        Listing storage listing = listings[listingId];
        require(listing.isActive, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");
        require(msg.sender != listing.seller, "Cannot buy own listing");
        
        uint256 platformFee = (listing.price * PLATFORM_FEE) / 10000;
        uint256 sellerAmount = listing.price - platformFee;
        
        listing.isActive = false;
        
        // Transfer payment to seller
        payable(listing.seller).transfer(sellerAmount);
        
        // Platform fee stays in contract (could be withdrawn by admin)
        
        emit ListingSold(listingId, msg.sender, listing.price, block.timestamp);
    }
    
    function cancelListing(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.isActive, "Listing not active");
        require(listing.seller == msg.sender, "Not the seller");
        
        listing.isActive = false;
        emit ListingCancelled(listingId, block.timestamp);
    }
    
    function getListing(uint256 listingId) external view returns (Listing memory) {
        return listings[listingId];
    }
    
    function getUserListings(address user) external view returns (uint256[] memory) {
        return userListings[user];
    }
    
    function getActiveListings() external view returns (uint256[] memory) {
        uint256[] memory activeListings = new uint256[](listingCount);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= listingCount; i++) {
            if (listings[i].isActive) {
                activeListings[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = activeListings[i];
        }
        
        return result;
    }
    
    function getListingCount() external view returns (uint256) {
        return listingCount;
    }
}
