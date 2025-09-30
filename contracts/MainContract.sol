// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./WaitlistContract.sol";
import "./UserProfileContract.sol";
import "./PointsContract.sol";
import "./ReferralContract.sol";
import "./StakingContract.sol";
import "./GovernanceContract.sol";
import "./NFTContract.sol";
import "./MarketplaceContract.sol";
import "./RewardContract.sol";

contract MainContract {
    WaitlistContract public waitlistContract;
    UserProfileContract public userProfileContract;
    PointsContract public pointsContract;
    ReferralContract public referralContract;
    StakingContract public stakingContract;
    GovernanceContract public governanceContract;
    NFTContract public nftContract;
    MarketplaceContract public marketplaceContract;
    RewardContract public rewardContract;
    
    address public owner;
    
    event ContractsLinked(
        address waitlist,
        address userProfile,
        address points,
        address referral,
        address staking,
        address governance,
        address nft,
        address marketplace,
        address reward,
        uint256 timestamp
    );
    
    constructor() {
        owner = msg.sender;
    }
    
    function setContracts(
        address _waitlistContract,
        address _userProfileContract,
        address _pointsContract,
        address _referralContract,
        address _stakingContract,
        address _governanceContract,
        address _nftContract,
        address _marketplaceContract,
        address _rewardContract
    ) external {
        require(msg.sender == owner, "Only owner can set contracts");
        
        waitlistContract = WaitlistContract(_waitlistContract);
        userProfileContract = UserProfileContract(_userProfileContract);
        pointsContract = PointsContract(_pointsContract);
        referralContract = ReferralContract(_referralContract);
        stakingContract = StakingContract(_stakingContract);
        governanceContract = GovernanceContract(_governanceContract);
        nftContract = NFTContract(_nftContract);
        marketplaceContract = MarketplaceContract(_marketplaceContract);
        rewardContract = RewardContract(_rewardContract);
        
        emit ContractsLinked(
            _waitlistContract,
            _userProfileContract,
            _pointsContract,
            _referralContract,
            _stakingContract,
            _governanceContract,
            _nftContract,
            _marketplaceContract,
            _rewardContract,
            block.timestamp
        );
    }
    
    // Helper functions to interact with all contracts
    function getUserData(address user) external view returns (
        bool isRegistered,
        bool hasProfile,
        uint256 points,
        address referrer,
        uint256 referralCount
    ) {
        isRegistered = waitlistContract.isUserRegistered(user);
        hasProfile = userProfileContract.hasProfile(user);
        points = pointsContract.getPoints(user);
        referrer = referralContract.getReferrer(user);
        referralCount = referralContract.getReferralCount(user);
    }
    
    function getContractAddresses() external view returns (
        address waitlist,
        address userProfile,
        address points,
        address referral,
        address staking,
        address governance,
        address nft,
        address marketplace,
        address reward
    ) {
        return (
            address(waitlistContract),
            address(userProfileContract),
            address(pointsContract),
            address(referralContract),
            address(stakingContract),
            address(governanceContract),
            address(nftContract),
            address(marketplaceContract),
            address(rewardContract)
        );
    }
}
