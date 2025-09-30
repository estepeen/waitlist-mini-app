// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract StakingContract {
    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 lockPeriod;
        bool isActive;
    }
    
    mapping(address => Stake[]) public userStakes;
    mapping(address => uint256) public totalStaked;
    
    uint256 public constant MIN_STAKE = 0.01 ether;
    uint256 public constant REWARD_RATE = 5; // 5% APY
    uint256 public constant LOCK_PERIOD = 30 days;
    
    event Staked(address indexed user, uint256 amount, uint256 lockPeriod, uint256 timestamp);
    event Unstaked(address indexed user, uint256 amount, uint256 reward, uint256 timestamp);
    
    function stake() external payable {
        require(msg.value >= MIN_STAKE, "Minimum stake not met");
        
        userStakes[msg.sender].push(Stake({
            amount: msg.value,
            startTime: block.timestamp,
            lockPeriod: LOCK_PERIOD,
            isActive: true
        }));
        
        totalStaked[msg.sender] += msg.value;
        emit Staked(msg.sender, msg.value, LOCK_PERIOD, block.timestamp);
    }
    
    function unstake(uint256 stakeIndex) external {
        require(stakeIndex < userStakes[msg.sender].length, "Invalid stake index");
        Stake storage userStake = userStakes[msg.sender][stakeIndex];
        require(userStake.isActive, "Stake not active");
        require(
            block.timestamp >= userStake.startTime + userStake.lockPeriod,
            "Lock period not ended"
        );
        
        uint256 reward = calculateReward(userStake);
        uint256 totalAmount = userStake.amount + reward;
        
        userStake.isActive = false;
        totalStaked[msg.sender] -= userStake.amount;
        
        payable(msg.sender).transfer(totalAmount);
        emit Unstaked(msg.sender, userStake.amount, reward, block.timestamp);
    }
    
    function calculateReward(Stake memory stakeInfo) public view returns (uint256) {
        uint256 stakingDuration = block.timestamp - stakeInfo.startTime;
        uint256 annualReward = (stakeInfo.amount * REWARD_RATE) / 100;
        return (annualReward * stakingDuration) / 365 days;
    }
    
    function getUserStakes(address user) external view returns (Stake[] memory) {
        return userStakes[user];
    }
    
    function getActiveStakesCount(address user) external view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < userStakes[user].length; i++) {
            if (userStakes[user][i].isActive) {
                count++;
            }
        }
        return count;
    }
}
