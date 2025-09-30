// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract RewardContract {
    struct Reward {
        uint256 rewardId;
        string name;
        string description;
        uint256 pointsRequired;
        uint256 availableQuantity;
        uint256 totalQuantity;
        bool isActive;
        address creator;
    }
    
    struct UserReward {
        uint256 rewardId;
        uint256 claimedAt;
        bool isClaimed;
    }
    
    mapping(uint256 => Reward) public rewards;
    mapping(address => UserReward[]) public userRewards;
    mapping(address => uint256) public userPoints; // This would be synced with PointsContract
    
    uint256 public rewardCount;
    uint256 public constant MIN_POINTS_REQUIRED = 10;
    
    event RewardCreated(uint256 indexed rewardId, string name, uint256 pointsRequired, uint256 quantity, uint256 timestamp);
    event RewardClaimed(uint256 indexed rewardId, address indexed user, uint256 timestamp);
    event PointsUpdated(address indexed user, uint256 newPoints, uint256 timestamp);
    
    function createReward(
        string memory _name,
        string memory _description,
        uint256 _pointsRequired,
        uint256 _quantity
    ) external returns (uint256) {
        require(_pointsRequired >= MIN_POINTS_REQUIRED, "Points required too low");
        require(_quantity > 0, "Quantity must be positive");
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        rewardCount++;
        rewards[rewardCount] = Reward({
            rewardId: rewardCount,
            name: _name,
            description: _description,
            pointsRequired: _pointsRequired,
            availableQuantity: _quantity,
            totalQuantity: _quantity,
            isActive: true,
            creator: msg.sender
        });
        
        emit RewardCreated(rewardCount, _name, _pointsRequired, _quantity, block.timestamp);
        return rewardCount;
    }
    
    function claimReward(uint256 rewardId) external {
        Reward storage reward = rewards[rewardId];
        require(reward.isActive, "Reward not active");
        require(reward.availableQuantity > 0, "Reward out of stock");
        require(userPoints[msg.sender] >= reward.pointsRequired, "Insufficient points");
        require(!hasClaimedReward(msg.sender, rewardId), "Already claimed");
        
        // Deduct points
        userPoints[msg.sender] -= reward.pointsRequired;
        
        // Reduce available quantity
        reward.availableQuantity--;
        
        // Record user reward
        userRewards[msg.sender].push(UserReward({
            rewardId: rewardId,
            claimedAt: block.timestamp,
            isClaimed: true
        }));
        
        emit RewardClaimed(rewardId, msg.sender, block.timestamp);
        emit PointsUpdated(msg.sender, userPoints[msg.sender], block.timestamp);
    }
    
    function hasClaimedReward(address user, uint256 rewardId) public view returns (bool) {
        UserReward[] memory userRewardList = userRewards[user];
        for (uint256 i = 0; i < userRewardList.length; i++) {
            if (userRewardList[i].rewardId == rewardId && userRewardList[i].isClaimed) {
                return true;
            }
        }
        return false;
    }
    
    function setUserPoints(address user, uint256 points) external {
        // This would typically be called by another contract or admin
        userPoints[user] = points;
        emit PointsUpdated(user, points, block.timestamp);
    }
    
    function addUserPoints(address user, uint256 points) external {
        userPoints[user] += points;
        emit PointsUpdated(user, userPoints[user], block.timestamp);
    }
    
    function getReward(uint256 rewardId) external view returns (Reward memory) {
        return rewards[rewardId];
    }
    
    function getUserRewards(address user) external view returns (UserReward[] memory) {
        return userRewards[user];
    }
    
    function getUserPoints(address user) external view returns (uint256) {
        return userPoints[user];
    }
    
    function getAvailableRewards() external view returns (uint256[] memory) {
        uint256[] memory availableRewards = new uint256[](rewardCount);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= rewardCount; i++) {
            if (rewards[i].isActive && rewards[i].availableQuantity > 0) {
                availableRewards[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = availableRewards[i];
        }
        
        return result;
    }
}
