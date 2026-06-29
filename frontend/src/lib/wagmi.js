import { createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [baseSepolia.id]: http("https://sepolia.base.org"),
  },
});

// Industry code mapping
export const INDUSTRIES = {
  1: "AI / ML",
  2: "Fintech",
  3: "Health",
  4: "SaaS",
  5: "Other",
};

// Stage code mapping
export const STAGES = {
  1: "Pre-seed",
  2: "Seed",
  3: "Series A",
};
