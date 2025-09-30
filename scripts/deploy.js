const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment to Base mainnet...");
  
  // Deploy individual contracts
  console.log("\n📝 Deploying WaitlistContract...");
  const WaitlistContract = await hre.ethers.getContractFactory("WaitlistContract");
  const waitlistContract = await WaitlistContract.deploy();
  await waitlistContract.waitForDeployment();
  const waitlistAddress = await waitlistContract.getAddress();
  console.log("✅ WaitlistContract deployed to:", waitlistAddress);

  console.log("\n👤 Deploying UserProfileContract...");
  const UserProfileContract = await hre.ethers.getContractFactory("UserProfileContract");
  const userProfileContract = await UserProfileContract.deploy();
  await userProfileContract.waitForDeployment();
  const userProfileAddress = await userProfileContract.getAddress();
  console.log("✅ UserProfileContract deployed to:", userProfileAddress);

  console.log("\n⭐ Deploying PointsContract...");
  const PointsContract = await hre.ethers.getContractFactory("PointsContract");
  const pointsContract = await PointsContract.deploy();
  await pointsContract.waitForDeployment();
  const pointsAddress = await pointsContract.getAddress();
  console.log("✅ PointsContract deployed to:", pointsAddress);

  console.log("\n🔗 Deploying ReferralContract...");
  const ReferralContract = await hre.ethers.getContractFactory("ReferralContract");
  const referralContract = await ReferralContract.deploy();
  await referralContract.waitForDeployment();
  const referralAddress = await referralContract.getAddress();
  console.log("✅ ReferralContract deployed to:", referralAddress);

  console.log("\n💰 Deploying StakingContract...");
  const StakingContract = await hre.ethers.getContractFactory("StakingContract");
  const stakingContract = await StakingContract.deploy();
  await stakingContract.waitForDeployment();
  const stakingAddress = await stakingContract.getAddress();
  console.log("✅ StakingContract deployed to:", stakingAddress);

  console.log("\n🗳️ Deploying GovernanceContract...");
  const GovernanceContract = await hre.ethers.getContractFactory("GovernanceContract");
  const governanceContract = await GovernanceContract.deploy();
  await governanceContract.waitForDeployment();
  const governanceAddress = await governanceContract.getAddress();
  console.log("✅ GovernanceContract deployed to:", governanceAddress);

  console.log("\n🎨 Deploying NFTContract...");
  const NFTContract = await hre.ethers.getContractFactory("NFTContract");
  const nftContract = await NFTContract.deploy();
  await nftContract.waitForDeployment();
  const nftAddress = await nftContract.getAddress();
  console.log("✅ NFTContract deployed to:", nftAddress);

  console.log("\n🛒 Deploying MarketplaceContract...");
  const MarketplaceContract = await hre.ethers.getContractFactory("MarketplaceContract");
  const marketplaceContract = await MarketplaceContract.deploy();
  await marketplaceContract.waitForDeployment();
  const marketplaceAddress = await marketplaceContract.getAddress();
  console.log("✅ MarketplaceContract deployed to:", marketplaceAddress);

  console.log("\n🎁 Deploying RewardContract...");
  const RewardContract = await hre.ethers.getContractFactory("RewardContract");
  const rewardContract = await RewardContract.deploy();
  await rewardContract.waitForDeployment();
  const rewardAddress = await rewardContract.getAddress();
  console.log("✅ RewardContract deployed to:", rewardAddress);

  console.log("\n🎯 Deploying MainContract...");
  const MainContract = await hre.ethers.getContractFactory("MainContract");
  const mainContract = await MainContract.deploy();
  await mainContract.waitForDeployment();
  const mainAddress = await mainContract.getAddress();
  console.log("✅ MainContract deployed to:", mainAddress);

  // Link all contracts to main contract
  console.log("\n🔗 Linking contracts to MainContract...");
  const linkTx = await mainContract.setContracts(
    waitlistAddress,
    userProfileAddress,
    pointsAddress,
    referralAddress,
    stakingAddress,
    governanceAddress,
    nftAddress,
    marketplaceAddress,
    rewardAddress
  );
  await linkTx.wait();
  console.log("✅ All contracts linked successfully!");

  // Verify contracts on Basescan
  console.log("\n🔍 Verifying contracts on Basescan...");
  try {
    await hre.run("verify:verify", {
      address: waitlistAddress,
      constructorArguments: [],
    });
    console.log("✅ WaitlistContract verified");
  } catch (error) {
    console.log("⚠️ WaitlistContract verification failed:", error.message);
  }

  try {
    await hre.run("verify:verify", {
      address: userProfileAddress,
      constructorArguments: [],
    });
    console.log("✅ UserProfileContract verified");
  } catch (error) {
    console.log("⚠️ UserProfileContract verification failed:", error.message);
  }

  try {
    await hre.run("verify:verify", {
      address: pointsAddress,
      constructorArguments: [],
    });
    console.log("✅ PointsContract verified");
  } catch (error) {
    console.log("⚠️ PointsContract verification failed:", error.message);
  }

  try {
    await hre.run("verify:verify", {
      address: referralAddress,
      constructorArguments: [],
    });
    console.log("✅ ReferralContract verified");
  } catch (error) {
    console.log("⚠️ ReferralContract verification failed:", error.message);
  }

  try {
    await hre.run("verify:verify", {
      address: mainAddress,
      constructorArguments: [],
    });
    console.log("✅ MainContract verified");
  } catch (error) {
    console.log("⚠️ MainContract verification failed:", error.message);
  }

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📋 Contract Addresses:");
  console.log("WaitlistContract:", waitlistAddress);
  console.log("UserProfileContract:", userProfileAddress);
  console.log("PointsContract:", pointsAddress);
  console.log("ReferralContract:", referralAddress);
  console.log("StakingContract:", stakingAddress);
  console.log("GovernanceContract:", governanceAddress);
  console.log("NFTContract:", nftAddress);
  console.log("MarketplaceContract:", marketplaceAddress);
  console.log("RewardContract:", rewardAddress);
  console.log("MainContract:", mainAddress);
  
  console.log("\n💡 Save these addresses to your .env file:");
  console.log(`NEXT_PUBLIC_WAITLIST_CONTRACT=${waitlistAddress}`);
  console.log(`NEXT_PUBLIC_USER_PROFILE_CONTRACT=${userProfileAddress}`);
  console.log(`NEXT_PUBLIC_POINTS_CONTRACT=${pointsAddress}`);
  console.log(`NEXT_PUBLIC_REFERRAL_CONTRACT=${referralAddress}`);
  console.log(`NEXT_PUBLIC_STAKING_CONTRACT=${stakingAddress}`);
  console.log(`NEXT_PUBLIC_GOVERNANCE_CONTRACT=${governanceAddress}`);
  console.log(`NEXT_PUBLIC_NFT_CONTRACT=${nftAddress}`);
  console.log(`NEXT_PUBLIC_MARKETPLACE_CONTRACT=${marketplaceAddress}`);
  console.log(`NEXT_PUBLIC_REWARD_CONTRACT=${rewardAddress}`);
  console.log(`NEXT_PUBLIC_MAIN_CONTRACT=${mainAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
