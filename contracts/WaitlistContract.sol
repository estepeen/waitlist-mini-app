// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract WaitlistContract {
    mapping(address => bool) public isRegistered;
    address[] public registeredAddresses;
    uint256 public registrationFee = 0.001 ether; // Malý poplatek pro zabezpečení
    
    event UserRegistered(address indexed user, uint256 timestamp);
    
    function joinWaitlist() external payable {
        require(!isRegistered[msg.sender], "Already registered");
        require(msg.value >= registrationFee, "Insufficient fee");
        
        isRegistered[msg.sender] = true;
        registeredAddresses.push(msg.sender);
        
        emit UserRegistered(msg.sender, block.timestamp);
    }
    
    function getRegisteredCount() external view returns (uint256) {
        return registeredAddresses.length;
    }
    
    function isUserRegistered(address user) external view returns (bool) {
        return isRegistered[user];
    }
    
    function getRegisteredUsers(uint256 start, uint256 end) external view returns (address[] memory) {
        require(start < registeredAddresses.length, "Start index out of bounds");
        require(end <= registeredAddresses.length, "End index out of bounds");
        require(start <= end, "Invalid range");
        
        address[] memory result = new address[](end - start);
        for (uint256 i = start; i < end; i++) {
            result[i - start] = registeredAddresses[i];
        }
        return result;
    }
}
