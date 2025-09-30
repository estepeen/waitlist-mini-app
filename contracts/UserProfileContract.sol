// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UserProfileContract {
    struct UserProfile {
        string name;
        string email;
        string bio;
        uint256 joinDate;
        bool isActive;
    }
    
    mapping(address => UserProfile) public profiles;
    mapping(address => bool) public hasProfile;
    
    event ProfileCreated(address indexed user, string name, uint256 timestamp);
    event ProfileUpdated(address indexed user, string name, uint256 timestamp);
    
    function createProfile(
        string memory _name,
        string memory _email,
        string memory _bio
    ) external {
        require(!hasProfile[msg.sender], "Profile already exists");
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        profiles[msg.sender] = UserProfile({
            name: _name,
            email: _email,
            bio: _bio,
            joinDate: block.timestamp,
            isActive: true
        });
        
        hasProfile[msg.sender] = true;
        emit ProfileCreated(msg.sender, _name, block.timestamp);
    }
    
    function updateProfile(
        string memory _name,
        string memory _email,
        string memory _bio
    ) external {
        require(hasProfile[msg.sender], "Profile does not exist");
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        profiles[msg.sender].name = _name;
        profiles[msg.sender].email = _email;
        profiles[msg.sender].bio = _bio;
        
        emit ProfileUpdated(msg.sender, _name, block.timestamp);
    }
    
    function deactivateProfile() external {
        require(hasProfile[msg.sender], "Profile does not exist");
        profiles[msg.sender].isActive = false;
    }
    
    function getProfile(address user) external view returns (UserProfile memory) {
        require(hasProfile[user], "Profile does not exist");
        return profiles[user];
    }
}
