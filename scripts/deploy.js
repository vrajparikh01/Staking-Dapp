const hre = require("hardhat");

async function main() {
  const StakingToken = await hre.ethers.getContractFactory("StakingToken");
  const stakingtoken = await StakingToken.deploy("1000000000000000000000");
  await stakingtoken.deployed();
  console.log("Stake token deployed to ", stakingtoken.address);

  const RewardToken = await hre.ethers.getContractFactory("RewardToken");
  const rewardtoken = await RewardToken.deploy("10000000000000000000000000000");
  await rewardtoken.deployed();
  console.log("Reward token deployed to ", rewardtoken.address);

  const Staking = await hre.ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(
    stakingtoken.address,
    rewardtoken.address
  );
  await staking.deployed();
  console.log("Staking contract deployed to ", staking.address);
}

// We recommend this pattern
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
