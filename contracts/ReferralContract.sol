// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ReferralContract {
    mapping(address => address) public referrers;
    mapping(address => address[]) public referrals;
    mapping(address => uint256) public referralCount;
    mapping(address => uint256) public referralRewards;
    
    uint256 public constant REFERRAL_REWARD = 50; // Points
    
    event ReferralCreated(address indexed referrer, address indexed referee, uint256 timestamp);
    event ReferralRewardEarned(address indexed referrer, uint256 reward, uint256 timestamp);
    
    function setReferrer(address referrer) external {
        require(referrers[msg.sender] == address(0), "Already has referrer");
        require(referrer != msg.sender, "Cannot refer yourself");
        require(referrer != address(0), "Invalid referrer");
        
        referrers[msg.sender] = referrer;
        referrals[referrer].push(msg.sender);
        referralCount[referrer]++;
        
        // Give reward to referrer
        referralRewards[referrer] += REFERRAL_REWARD;
        
        emit ReferralCreated(referrer, msg.sender, block.timestamp);
        emit ReferralRewardEarned(referrer, REFERRAL_REWARD, block.timestamp);
    }
    
    function getReferrer(address user) external view returns (address) {
        return referrers[user];
    }
    
    function getReferrals(address referrer) external view returns (address[] memory) {
        return referrals[referrer];
    }
    
    function getReferralCount(address referrer) external view returns (uint256) {
        return referralCount[referrer];
    }
    
    function getReferralRewards(address referrer) external view returns (uint256) {
        return referralRewards[referrer];
    }
}
