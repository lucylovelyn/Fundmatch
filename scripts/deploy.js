const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  FundMatch — Deploying to", hre.network.name);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Deployer:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance: ", hre.ethers.formatEther(balance), "ETH");
  console.log("");

  // ── 1. Deploy FounderRegistry ─────────────────────────────────────────────
  console.log("1/3 Deploying FounderRegistry...");
  const FounderRegistry = await hre.ethers.getContractFactory("FounderRegistry");
  const founderRegistry = await FounderRegistry.deploy();
  await founderRegistry.waitForDeployment();
  const founderAddr = await founderRegistry.getAddress();
  console.log("    ✓ FounderRegistry:", founderAddr);

  // ── 2. Deploy InvestorRegistry ────────────────────────────────────────────
  console.log("2/3 Deploying InvestorRegistry...");
  const InvestorRegistry = await hre.ethers.getContractFactory("InvestorRegistry");
  const investorRegistry = await InvestorRegistry.deploy();
  await investorRegistry.waitForDeployment();
  const investorAddr = await investorRegistry.getAddress();
  console.log("    ✓ InvestorRegistry:", investorAddr);

  // ── 3. Deploy MatchEngine ─────────────────────────────────────────────────
  console.log("3/3 Deploying MatchEngine...");
  const MatchEngine = await hre.ethers.getContractFactory("MatchEngine");
  const matchEngine = await MatchEngine.deploy(founderAddr, investorAddr);
  await matchEngine.waitForDeployment();
  const matchAddr = await matchEngine.getAddress();
  console.log("    ✓ MatchEngine:", matchAddr);

  // ── Write addresses to file for frontend ─────────────────────────────────
  const deployment = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      FounderRegistry: founderAddr,
      InvestorRegistry: investorAddr,
      MatchEngine: matchAddr,
    },
  };

  const outPath = path.join(__dirname, "../frontend/src/lib/deployment.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(deployment, null, 2));

  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Deployment complete!");
  console.log("  Addresses written to frontend/src/lib/deployment.json");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");
  console.log("Next steps:");
  console.log("  1. Copy addresses above into your .env file");
  console.log("  2. cd frontend && npm install && npm run dev");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
