const hre = require("hardhat");

async function main() {
  const [deployer, beekeeper1, officer1, supervisor1] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Deploy HoneyChain
  const HoneyChain = await hre.ethers.getContractFactory("HoneyChain");
  const honeyChain = await HoneyChain.deploy();
  await honeyChain.waitForDeployment();
  const honeyChainAddress = await honeyChain.getAddress();
  console.log("HoneyChain deployed to:", honeyChainAddress);
  
  // Deploy HoneyChainQR
  const HoneyChainQR = await hre.ethers.getContractFactory("HoneyChainQR");
  const honeyChainQR = await HoneyChainQR.deploy(honeyChainAddress);
  await honeyChainQR.waitForDeployment();
  const qrAddress = await honeyChainQR.getAddress();
  console.log("HoneyChainQR deployed to:", qrAddress);
  
  console.log("\n--- Seeding Data ---");
  
  // Setup Roles
  await honeyChain.grantRole(await honeyChain.BEEKEEPER_ROLE(), beekeeper1.address);
  await honeyChain.grantRole(await honeyChain.FIELD_OFFICER_ROLE(), officer1.address);
  await honeyChain.grantRole(await honeyChain.DISTRICT_SUPERVISOR_ROLE(), supervisor1.address);
  
  // 1. Register Farmer
  console.log("Registering Farmer...");
  await honeyChain.connect(officer1).registerFarmer(
      beekeeper1.address,
      "Ramesh (Sundarbans)",
      "Sundarbans, West Bengal",
      "COOP-SB-001",
      "QmProfileHash..."
  );
  
  // 2. Beekeeper Submits Harvest
  console.log("Submitting Harvest...");
  await honeyChain.connect(beekeeper1).submitHarvest(
      "Mangrove Flora",
      250, // 250 kg
      "QmHarvestMetadataHash..."
  );
  
  // 3. Officer Approves and Mints Batch
  console.log("Approving Harvest and Minting Batch...");
  await honeyChain.connect(officer1).approveHarvestAndMint(
      1, // requestId
      95, // qualityScore
      "Grade A",
      "QmBatchMetadataHash..."
  );
  
  // 4. Generate QR (Commit & Reveal)
  console.log("Generating QR Code...");
  const batchId = 1;
  const qrToken = "qr_token_demo_12345";
  const seed = "random_seed_abc";
  
  // Commit
  const seedHash = hre.ethers.solidityPackedKeccak256(["string"], [seed]);
  await honeyChainQR.connect(officer1).commitQR(seedHash, batchId);
  
  // Reveal
  await honeyChainQR.connect(officer1).registerQR(qrToken, batchId, seed);
  
  console.log("Seed complete! Demo ready to run.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
