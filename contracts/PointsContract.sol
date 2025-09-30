// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PointsContract {
    mapping(address => uint256) public userPoints;
    mapping(address => uint256) public lastClaimTime;
    
    uint256 public constant POINTS_PER_DAY = 10;
    uint256 public constant CLAIM_COOLDOWN = 1 days;
    
    event PointsEarned(address indexed user, uint256 points, uint256 timestamp);
    event PointsSpent(address indexed user, uint256 points, uint256 timestamp);
    
    function claimDailyPoints() external {
        require(
            block.timestamp >= lastClaimTime[msg.sender] + CLAIM_COOLDOWN,
            "Cooldown not finished"
        );
        
        userPoints[msg.sender] += POINTS_PER_DAY;
        lastClaimTime[msg.sender] = block.timestamp;
        
        emit PointsEarned(msg.sender, POINTS_PER_DAY, block.timestamp);
    }
    
    function spendPoints(uint256 amount) external {
        require(userPoints[msg.sender] >= amount, "Insufficient points");
        
        userPoints[msg.sender] -= amount;
        emit PointsSpent(msg.sender, amount, block.timestamp);
    }
    
    function getPoints(address user) external view returns (uint256) {
        return userPoints[user];
    }
    
    function canClaim(address user) external view returns (bool) {
        return block.timestamp >= lastClaimTime[user] + CLAIM_COOLDOWN;
    }
}
