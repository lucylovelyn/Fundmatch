"use client";

import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

const { chains, publicClient } = configureChains(
  [baseSepolia],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  publicClient,
});

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>FundMatch — Find your next investor without exposing your startup.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <WagmiConfig config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}