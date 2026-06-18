// Auto-populated by deploy script — do not edit manually
// If deployment.json doesn't exist yet, run: npm run deploy:basesepolia

let deployment = {
  contracts: {
    FounderRegistry: "",
    InvestorRegistry: "",
    MatchEngine: "",
  },
};

try {
  deployment = require("./deployment.json");
} catch {
  console.warn("deployment.json not found — run deploy script first");
}

export const CONTRACT_ADDRESSES = deployment.contracts;

// ── ABIs (minimal — only functions we call from the frontend) ───────────────

export const FOUNDER_REGISTRY_ABI = [
  {
    name: "registerFounder",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_arr",      type: "bytes32" },
      { name: "_growth",   type: "bytes32" },
      { name: "_runway",   type: "bytes32" },
      { name: "_industry", type: "bytes32" },
      { name: "_stage",    type: "bytes32" },
    ],
    outputs: [],
  },
  {
    name: "isRegistered",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "founder", type: "address" }],
    outputs: [{ type: "bool" }],
  },
  {
    name: "FounderRegistered",
    type: "event",
    inputs: [
      { name: "founder",   type: "address", indexed: true },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
];

export const INVESTOR_REGISTRY_ABI = [
  {
    name: "registerInvestor",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_minArr",         type: "bytes32" },
      { name: "_minGrowth",      type: "bytes32" },
      { name: "_minRunway",      type: "bytes32" },
      { name: "_targetIndustry", type: "bytes32" },
      { name: "_targetStage",    type: "bytes32" },
    ],
    outputs: [],
  },
  {
    name: "isRegistered",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "investor", type: "address" }],
    outputs: [{ type: "bool" }],
  },
];

export const MATCH_ENGINE_ABI = [
  {
    name: "computeMatch",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "investor", type: "address" },
      { name: "founder",  type: "address" },
    ],
    outputs: [],
  },
  {
    name: "getMatchResult",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "investor", type: "address" },
      { name: "founder",  type: "address" },
    ],
    outputs: [
      { name: "arrMet",      type: "uint256" },
      { name: "growthMet",   type: "uint256" },
      { name: "runwayMet",   type: "uint256" },
      { name: "industryMet", type: "uint256" },
      { name: "score",       type: "uint256" },
      { name: "computed",    type: "bool"    },
      { name: "computedAt",  type: "uint256" },
    ],
  },
  {
    name: "hasMatch",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "investor", type: "address" },
      { name: "founder",  type: "address" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    name: "MatchComputed",
    type: "event",
    inputs: [
      { name: "investor",  type: "address", indexed: true },
      { name: "founder",   type: "address", indexed: true },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
];
