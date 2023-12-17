// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Staking is ReentrancyGuard {
    IERC20 public s_stakingToken;
    IERC20 public s_rewardToken;

    uint public constant REWARD_RATE = 10;

    uint private totalStakedTokens;
    uint private rewardPerTokenStored;
    uint private lastUpdatedTime;

    mapping(address=>uint) public stakedBalance;
    mapping(address=>uint) public rewards;
    mapping(address=>uint) public userRewardPerTokenPaid;

    event Staked(address indexed user, uint indexed amount);
    event Withdrawn(address indexed user, uint indexed amount);
    event RewardsClaimed(address indexed user, uint indexed amount);

    constructor(address stakeToken, address rewardToken) {
        s_stakingToken = IERC20(stakeToken);
        s_rewardToken = IERC20(rewardToken);
    }

    function rewardPerToken() public view returns(uint){
        if(totalStakedTokens==0){
            return rewardPerTokenStored;
        }

        uint totalTime = (block.timestamp) - lastUpdatedTime;
        uint totalRewards = totalTime*REWARD_RATE;
        return rewardPerTokenStored+(totalRewards/totalStakedTokens);
    }

    function earned(address account) public view returns(uint){
        return (stakedBalance[account])*(rewardPerToken()-userRewardPerTokenPaid[account]);
    }

    modifier updateReward(address account){
        rewardPerTokenStored = rewardPerToken();
        lastUpdatedTime = block.timestamp;
        rewards[account] = earned(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        _;
    }

    function stake(uint amount) public nonReentrant updateReward(msg.sender){
        require(amount>0,"Amt must be greater than 0");
        totalStakedTokens+=amount;
        stakedBalance[msg.sender]+=amount;

        emit Staked(msg.sender, amount);

        bool success = s_stakingToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer failed");
    }

    function withdraw(uint amount) public nonReentrant updateReward(msg.sender){
        require(amount>0,"Amt must be greater than 0");
        totalStakedTokens-=amount;
        stakedBalance[msg.sender]-=amount;

        emit Withdrawn(msg.sender, amount);

        bool success = s_stakingToken.transfer(msg.sender, amount);
        require(success, "Transfer failed");
    }

    function claimReward() public nonReentrant updateReward(msg.sender){
        uint reward = rewards[msg.sender];
        require(reward>0, "No rewards to claim");

        rewards[msg.sender] = 0;

        emit RewardsClaimed(msg.sender, reward);

        bool success = s_rewardToken.transfer(msg.sender, reward);
        require(success, "Transfer failed");
    }
}