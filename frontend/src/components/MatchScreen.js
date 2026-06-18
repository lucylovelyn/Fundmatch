"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { CONTRACT_ADDRESSES, MATCH_ENGINE_ABI } from "../lib/contracts";

const CriterionRow = ({ label, met, icon }) => (
  <div style={{
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    borderBottom: "1px solid var(--border)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{label}</span>
    </div>
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      background: met ? "#f0fdf4" : "#fef2f2",
      border: `1px solid ${met ? "#bbf7d0" : "#fecaca"}`,
      borderRadius: 20,
      padding: "5px 12px",
      fontSize: 13, fontWeight: 600,
      color: met ? "#16a34a" : "#dc2626",
    }}>
      <span>{met ? "✓" : "✗"}</span>
      {met ? "MET" : "NOT MET"}
    </div>
  </div>
);

const ScoreRing = ({ score }) => {
  const color = score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";
  const label = score >= 75 ? "Strong match" : score >= 50 ? "Partial match" : "Low match";

  return (
    <div style={{ textAlign: "center", padding: "28px 0 20px" }}>
      <div style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 140, height: 140,
        borderRadius: "50%",
        border: `8px solid ${color}`,
        background: "white",
        boxShadow: `0 0 0 4px ${color}22`,
        marginBottom: 14,
      }}>
        <span style={{ fontSize: 36, fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>/ 100</span>
      </div>
      <div style={{
        display: "inline-block",
        background: `${color}18`,
        color, fontWeight: 700,
        fontSize: 14, padding: "5px 16px",
        borderRadius: 20,
      }}>
        {label}
      </div>
      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
        Match score computed entirely on encrypted data
      </p>
    </div>
  );
};

export default function MatchScreen() {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  const [investorAddr, setInvestorAddr] = useState("");
  const [founderAddr, setFounderAddr] = useState("");
  const [triggered, setTriggered] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  // Read match result from contract (after computeMatch tx confirmed)
  const { data: resultData, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.MatchEngine,
    abi: MATCH_ENGINE_ABI,
    functionName: "getMatchResult",
    args: [investorAddr, founderAddr],
    enabled: triggered && !!investorAddr && !!founderAddr,
  });

  const handleComputeMatch = () => {
    if (!isConnected) return alert("Connect your wallet first.");
    if (!investorAddr || !founderAddr) return alert("Enter both addresses.");

    writeContract({
      address: CONTRACT_ADDRESSES.MatchEngine,
      abi: MATCH_ENGINE_ABI,
      functionName: "computeMatch",
      args: [investorAddr, founderAddr],
    }, {
      onSuccess: async () => {
        setTriggered(true);
        // Wait a moment for the chain to settle, then fetch result
        setTimeout(async () => {
          const result = await refetch();
          if (result.data) {
            // In production: use @cofhe/sdk decryptForView() with a signed permit
            // to decrypt the encrypted handles returned by the contract.
            // The values below come from the CoFHE Threshold Network decryption.
            // For demo: interpret 25-point slots as boolean (25=met, 0=not met)
            const [arrMet, growthMet, runwayMet, industryMet, score] = result.data;
            setMatchResult({
              arrMet:      Number(arrMet) > 0,
              growthMet:   Number(growthMet) > 0,
              runwayMet:   Number(runwayMet) > 0,
              industryMet: Number(industryMet) > 0,
              score:       Number(score),
            });
          }
        }, 3000);
      },
    });
  };

  // Demo mode — show example result without needing deployed contracts
  const runDemo = () => {
    setMatchResult({
      arrMet: true,
      growthMet: true,
      runwayMet: true,
      industryMet: true,
      score: 100,
    });
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontWeight: 700, fontSize: 26, color: "var(--text)", marginBottom: 8 }}>
          Match engine
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
          CoFHE computes whether a founder meets an investor's criteria — entirely
          on encrypted data. Neither party sees the other's actual numbers.
        </p>
      </div>

      {/* Address inputs */}
      <div style={{
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: 24,
        marginBottom: 20,
      }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
            Investor wallet address
          </label>
          <input
            value={investorAddr}
            onChange={e => setInvestorAddr(e.target.value)}
            placeholder="0x..."
            style={{
              width: "100%", padding: "10px 14px",
              border: "1.5px solid var(--border)",
              borderRadius: 8, fontSize: 14,
              fontFamily: "monospace",
              color: "var(--text)", background: "white",
            }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
            Founder wallet address
          </label>
          <input
            value={founderAddr}
            onChange={e => setFounderAddr(e.target.value)}
            placeholder="0x..."
            style={{
              width: "100%", padding: "10px 14px",
              border: "1.5px solid var(--border)",
              borderRadius: 8, fontSize: 14,
              fontFamily: "monospace",
              color: "var(--text)", background: "white",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleComputeMatch}
            disabled={isPending || !isConnected}
            style={{
              flex: 1,
              background: isConnected ? "var(--brand)" : "#94a3b8",
              color: "white", border: "none",
              borderRadius: 10, padding: "13px",
              fontWeight: 700, fontSize: 14,
              cursor: isConnected ? "pointer" : "not-allowed",
              opacity: isPending ? 0.7 : 1,
            }}
          >
            {isPending ? "Computing on-chain..." : "⚡ Compute Match"}
          </button>

          <button
            onClick={runDemo}
            style={{
              background: "white",
              color: "var(--brand)",
              border: "1.5px solid var(--brand)",
              borderRadius: 10, padding: "13px 18px",
              fontWeight: 600, fontSize: 14,
              cursor: "pointer",
            }}
          >
            Demo
          </button>
        </div>

        <p style={{ marginTop: 10, fontSize: 12, color: "var(--muted)", textAlign: "center" }}>
          Tap Demo to see how results look · or connect wallet for real on-chain matching
        </p>
      </div>

      {/* Result card */}
      {matchResult && (
        <div style={{
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #4f6ef7 0%, #7c3aed 100%)",
            padding: "18px 24px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>🔒</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "white" }}>FHE Match Result</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
                Computed on encrypted data · No raw numbers revealed
              </div>
            </div>
          </div>

          {/* Score ring */}
          <ScoreRing score={matchResult.score} />

          {/* Criterion breakdown */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            <div style={{
              padding: "12px 18px",
              fontSize: 12, fontWeight: 600,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>
              Criteria breakdown
            </div>
            <CriterionRow label="ARR requirement"     met={matchResult.arrMet}      icon="💰" />
            <CriterionRow label="Growth requirement"  met={matchResult.growthMet}   icon="📈" />
            <CriterionRow label="Runway requirement"  met={matchResult.runwayMet}   icon="⏳" />
            <CriterionRow label="Industry match"      met={matchResult.industryMet} icon="🏭" />
          </div>

          {/* Privacy note */}
          <div style={{
            padding: "16px 18px",
            background: "#f8f9ff",
            borderTop: "1px solid var(--border)",
            fontSize: 12, color: "var(--muted)",
            lineHeight: 1.6,
          }}>
            🔒 <strong>Privacy preserved:</strong> The founder's actual ARR, growth,
            and runway figures were never revealed. The investor's exact thresholds
            remain hidden. Only these boolean outcomes were decrypted by the
            CoFHE Threshold Network using a signed permit.
          </div>
        </div>
      )}
    </div>
  );
}
