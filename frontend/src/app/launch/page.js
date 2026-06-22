"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import FounderScreen from "../components/FounderScreen";
import InvestorScreen from "../components/InvestorScreen";
import MatchScreen from "../components/MatchScreen";

export default function Home() {
  const [activeTab, setActiveTab] = useState("founder");
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const tabs = [
    { id: "founder",  label: "I'm a Founder",  icon: "🚀" },
    { id: "investor", label: "I'm an Investor", icon: "💼" },
    { id: "match",    label: "Match Engine",    icon: "⚡" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface)" }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header style={{
        background: "white",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32,
              background: "var(--brand)",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>⚡</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: "var(--text)", lineHeight: 1.1 }}>
                FundMatch
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>
                Powered by FHE
              </div>
            </div>
          </div>

          {/* Tagline — hidden on small screens */}
          <div style={{
            fontSize: 13, color: "var(--muted)",
            display: "none",
          }} className="md:block">
            Find your next investor without exposing your startup.
          </div>

          {/* Wallet connect */}
          <div>
            {isConnected ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: 20,
                  padding: "6px 12px",
                  fontSize: 12,
                  color: "#16a34a",
                  fontWeight: 500,
                }}>
                  🟢 {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
                <button
                  onClick={() => disconnect()}
                  style={{
                    fontSize: 12, color: "var(--muted)",
                    background: "none", border: "none",
                    cursor: "pointer", padding: "6px 8px",
                  }}
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect({ connector: connectors[0] })}
                style={{
                  background: "var(--brand)",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Tab navigation ──────────────────────────────────────────────────── */}
      <div style={{
        background: "white",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          padding: "0 24px",
          gap: 4,
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "14px 20px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontWeight: activeTab === tab.id ? 600 : 400,
                fontSize: 14,
                color: activeTab === tab.id ? "var(--brand)" : "var(--muted)",
                borderBottom: activeTab === tab.id ? "2px solid var(--brand)" : "2px solid transparent",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Screen content ───────────────────────────────────────────────────── */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* FHE notice banner */}
        <div style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: 10,
          padding: "12px 16px",
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 13,
          color: "#1d4ed8",
        }}>
          <span style={{ fontSize: 16 }}>🔒</span>
          <span>
            <strong>All data is encrypted end-to-end using Fully Homomorphic Encryption.</strong>{" "}
            Your actual numbers are never exposed — not on-chain, not to the other party, not to FundMatch.
          </span>
        </div>

        {activeTab === "founder"  && <FounderScreen />}
        {activeTab === "investor" && <InvestorScreen />}
        {activeTab === "match"    && <MatchScreen />}
      </main>
    </div>
  );
}
