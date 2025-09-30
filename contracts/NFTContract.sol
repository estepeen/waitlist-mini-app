// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NFTContract {
    struct NFT {
        uint256 tokenId;
        string name;
        string description;
        string imageURI;
        address owner;
        uint256 mintTime;
        bool isActive;
    }
    
    mapping(uint256 => NFT) public nfts;
    mapping(address => uint256[]) public userNFTs;
    mapping(address => uint256) public userNFTCount;
    
    uint256 public totalSupply;
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MINT_PRICE = 0.01 ether;
    
    event NFTMinted(uint256 indexed tokenId, address indexed owner, string name, uint256 timestamp);
    event NFTTransferred(uint256 indexed tokenId, address indexed from, address indexed to, uint256 timestamp);
    
    function mintNFT(
        string memory _name,
        string memory _description,
        string memory _imageURI
    ) external payable returns (uint256) {
        require(msg.value >= MINT_PRICE, "Insufficient payment");
        require(totalSupply < MAX_SUPPLY, "Max supply reached");
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        totalSupply++;
        uint256 tokenId = totalSupply;
        
        nfts[tokenId] = NFT({
            tokenId: tokenId,
            name: _name,
            description: _description,
            imageURI: _imageURI,
            owner: msg.sender,
            mintTime: block.timestamp,
            isActive: true
        });
        
        userNFTs[msg.sender].push(tokenId);
        userNFTCount[msg.sender]++;
        
        emit NFTMinted(tokenId, msg.sender, _name, block.timestamp);
        return tokenId;
    }
    
    function transferNFT(uint256 tokenId, address to) external {
        require(nfts[tokenId].owner == msg.sender, "Not the owner");
        require(nfts[tokenId].isActive, "NFT not active");
        require(to != address(0), "Invalid recipient");
        
        address from = nfts[tokenId].owner;
        nfts[tokenId].owner = to;
        
        // Update user NFT arrays
        _removeFromUserNFTs(from, tokenId);
        userNFTs[to].push(tokenId);
        userNFTCount[from]--;
        userNFTCount[to]++;
        
        emit NFTTransferred(tokenId, from, to, block.timestamp);
    }
    
    function _removeFromUserNFTs(address user, uint256 tokenId) internal {
        uint256[] storage userNFTList = userNFTs[user];
        for (uint256 i = 0; i < userNFTList.length; i++) {
            if (userNFTList[i] == tokenId) {
                userNFTList[i] = userNFTList[userNFTList.length - 1];
                userNFTList.pop();
                break;
            }
        }
    }
    
    function getNFT(uint256 tokenId) external view returns (NFT memory) {
        require(nfts[tokenId].isActive, "NFT not found");
        return nfts[tokenId];
    }
    
    function getUserNFTs(address user) external view returns (uint256[] memory) {
        return userNFTs[user];
    }
    
    function getNFTCount() external view returns (uint256) {
        return totalSupply;
    }
    
    function isOwner(uint256 tokenId, address user) external view returns (bool) {
        return nfts[tokenId].owner == user && nfts[tokenId].isActive;
    }
}
