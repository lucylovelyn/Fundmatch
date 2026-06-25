import { createConfig, configureChains } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [baseSepolia],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

export const INDUSTRIES = {
  1: "AI / ML",
  2: "Fintech",
  3: "Health",
  4: "SaaS",
  5: "Other",
};

export const STAGES = {
  1: "Pre-seed",
  2: "Seed",
  3: "Series A",
};