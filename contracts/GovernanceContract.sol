// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GovernanceContract {
    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 startTime;
        uint256 endTime;
        address proposer;
        bool executed;
        bool active;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    mapping(address => uint256) public votingPower;
    
    uint256 public proposalCount;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant MIN_PROPOSAL_THRESHOLD = 100; // Minimum points to propose
    
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title, uint256 timestamp);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight, uint256 timestamp);
    event ProposalExecuted(uint256 indexed proposalId, uint256 timestamp);
    
    function createProposal(
        string memory _title,
        string memory _description
    ) external returns (uint256) {
        require(votingPower[msg.sender] >= MIN_PROPOSAL_THRESHOLD, "Insufficient voting power");
        
        proposalCount++;
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            title: _title,
            description: _description,
            votesFor: 0,
            votesAgainst: 0,
            startTime: block.timestamp,
            endTime: block.timestamp + VOTING_PERIOD,
            proposer: msg.sender,
            executed: false,
            active: true
        });
        
        emit ProposalCreated(proposalCount, msg.sender, _title, block.timestamp);
        return proposalCount;
    }
    
    function vote(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.active, "Proposal not active");
        require(block.timestamp <= proposal.endTime, "Voting period ended");
        require(!hasVoted[msg.sender][proposalId], "Already voted");
        require(votingPower[msg.sender] > 0, "No voting power");
        
        hasVoted[msg.sender][proposalId] = true;
        
        if (support) {
            proposal.votesFor += votingPower[msg.sender];
        } else {
            proposal.votesAgainst += votingPower[msg.sender];
        }
        
        emit VoteCast(proposalId, msg.sender, support, votingPower[msg.sender], block.timestamp);
    }
    
    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.active, "Proposal not active");
        require(block.timestamp > proposal.endTime, "Voting period not ended");
        require(!proposal.executed, "Proposal already executed");
        require(proposal.votesFor > proposal.votesAgainst, "Proposal not passed");
        
        proposal.executed = true;
        proposal.active = false;
        
        emit ProposalExecuted(proposalId, block.timestamp);
    }
    
    function setVotingPower(address user, uint256 power) external {
        // This would typically be called by an admin or another contract
        votingPower[user] = power;
    }
    
    function getProposal(uint256 proposalId) external view returns (Proposal memory) {
        return proposals[proposalId];
    }
    
    function getProposalCount() external view returns (uint256) {
        return proposalCount;
    }
}
