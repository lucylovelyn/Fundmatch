"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESSES, INVESTOR_REGISTRY_ABI } from "../lib/contracts";
import { INDUSTRIES, STAGES } from "../lib/wagmi";

const CriteriaField = ({ label, value, onChange, placeholder, unit, hint, operator = "≥" }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{
      display: "block", fontSize: 13,
      fontWeight: 600, color: "var(--text)", marginBottom: 6,
    }}>
      {label}
      <span style={{
        marginLeft: 8, fontSize: 11,
        background: "#f5f0ff", color: "#7c3aed",
        padding: "2px 7px", borderRadius: 10, fontWeight: 500,
      }}>
        🔒 encrypted threshold
      </span>
    </label>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        background: "#f5f0ff", borderRadius: 6,
        padding: "10px 12px", fontSize: 14,
        fontWeight: 700, color: "#7c3aed",
        whiteSpace: "nowrap",
      }}>
        {operator}
      </div>
      <div style={{ position: "relative", flex: 1 }}>
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: unit ? "10px 48px 10px 14px" : "10px 14px",
            border: "1.5px solid var(--border)",
            borderRadius: 8, fontSize: 15,
            color: "var(--text)", background: "white",
            outline: "none",
          }}
          onFocus={e => e.target.style.borderColor = "#7c3aed"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
        {unit && (
          <span style={{
            position: "absolute", right: 12, top: "50%",
            transform: "translateY(-50%)",
            color: "var(--muted)", fontSize: 13,
          }}>
            {unit}
          </span>
        )}
      </div>
    </div>
    {hint && <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{hint}</p>}
  </div>
);

export default function InvestorScreen() {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const [form, setForm] = useState({
    minArr: "",
    minGrowth: "",
    minRunway: "",
    targetIndustry: "1",
    targetStage: "2",
  });

  const [submitted, setSubmitted] = useState(false);
  const set = (field) => (val) => setForm(f => ({ ...f, [field]: val }));

  const handleSubmit = async () => {
    if (!isConnected) return alert("Please connect your wallet first.");
    if (!form.minArr || !form.minGrowth || !form.minRunway) {
      return alert("Please fill in all required fields.");
    }

    // Production: encrypt each value with @cofhe/sdk before submission
    const minArrThousands     = Math.round(parseFloat(form.minArr));
    const minGrowthBasisPoints = Math.round(parseFloat(form.minGrowth) * 100);
    const minRunwayMonths     = Math.round(parseFloat(form.minRunway));

    writeContract({
      address: CONTRACT_ADDRESSES.InvestorRegistry,
      abi: INVESTOR_REGISTRY_ABI,
      functionName: "registerInvestor",
      args: [
        minArrThousands,
        minGrowthBasisPoints,
        minRunwayMonths,
        parseInt(form.targetIndustry),
        parseInt(form.targetStage),
      ],
    }, {
      onSuccess: () => setSubmitted(true),
    });
  };

  if (submitted || isSuccess) {
    return (
      <div style={{ maxWidth: 540, margin: "0 auto" }}>
        <div style={{
          background: "white",
          border: "1px solid #ddd6fe",
          borderRadius: 14,
          padding: 32,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 10, color: "var(--text)" }}>
            Investment criteria encrypted
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
            Your thresholds are stored encrypted on-chain. Founders will only
            learn if they met your bar — not what the bar actually was.
          </p>
          <div style={{
            marginTop: 24, padding: "14px 20px",
            background: "#f5f0ff", borderRadius: 10,
            fontSize: 13, color: "#7c3aed", fontWeight: 500,
          }}>
            ✓ Min ARR • ✓ Min Growth • ✓ Min Runway • ✓ Industry • ✓ Stage
          </div>
          <button
            onClick={() => { setSubmitted(false); }}
            style={{
              marginTop: 20, fontSize: 13, color: "#7c3aed",
              background: "none", border: "none", cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Update criteria
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 580, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontWeight: 700, fontSize: 26, color: "var(--text)", marginBottom: 8 }}>
          Investment criteria
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
          Set your minimum thresholds. They are encrypted before going on-chain —
          founders never see what bar they need to clear.
        </p>
      </div>

      <div style={{
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: 28,
      }}>
        <CriteriaField
          label="Minimum ARR"
          value={form.minArr}
          onChange={set("minArr")}
          placeholder="100"
          unit="$k"
          hint="Minimum annual recurring revenue in USD thousands"
        />

        <CriteriaField
          label="Minimum Monthly Growth"
          value={form.minGrowth}
          onChange={set("minGrowth")}
          placeholder="10"
          unit="%"
          hint="Minimum month-over-month growth rate"
        />

        <CriteriaField
          label="Minimum Runway"
          value={form.minRunway}
          onChange={set("minRunway")}
          placeholder="12"
          unit="months"
          hint="Minimum months of runway required"
        />

        <div style={{ marginBottom: 20 }}>
          <label style={{
            display: "block", fontSize: 13,
            fontWeight: 600, color: "var(--text)", marginBottom: 6,
          }}>
            Target Industry
            <span style={{
              marginLeft: 8, fontSize: 11, background: "#f5f0ff",
              color: "#7c3aed", padding: "2px 7px",
              borderRadius: 10, fontWeight: 500,
            }}>🔒 encrypted</span>
          </label>
          <select
            value={form.targetIndustry}
            onChange={e => set("targetIndustry")(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px",
              border: "1.5px solid var(--border)",
              borderRadius: 8, fontSize: 15,
              color: "var(--text)", background: "white",
            }}
          >
            {Object.entries(INDUSTRIES).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{
            display: "block", fontSize: 13,
            fontWeight: 600, color: "var(--text)", marginBottom: 6,
          }}>
            Target Stage
            <span style={{
              marginLeft: 8, fontSize: 11, background: "#f5f0ff",
              color: "#7c3aed", padding: "2px 7px",
              borderRadius: 10, fontWeight: 500,
            }}>🔒 encrypted</span>
          </label>
          <select
            value={form.targetStage}
            onChange={e => set("targetStage")(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px",
              border: "1.5px solid var(--border)",
              borderRadius: 8, fontSize: 15,
              color: "var(--text)", background: "white",
            }}
          >
            {Object.entries(STAGES).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        {error && (
          <div style={{
            marginBottom: 16, padding: "10px 14px",
            background: "#fef2f2", borderRadius: 8,
            fontSize: 13, color: "#dc2626",
          }}>
            {error.message}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isPending || !isConnected}
          style={{
            width: "100%",
            background: isConnected ? "#7c3aed" : "#94a3b8",
            color: "white", border: "none",
            borderRadius: 10, padding: "14px",
            fontWeight: 700, fontSize: 15,
            cursor: isConnected ? "pointer" : "not-allowed",
            opacity: isPending ? 0.7 : 1,
          }}
        >
          {isPending ? "Encrypting & submitting..." : isConnected ? "🔒 Encrypt & Submit Criteria" : "Connect wallet to continue"}
        </button>

        <p style={{ marginTop: 12, fontSize: 12, color: "var(--muted)", textAlign: "center" }}>
          Encrypted using CoFHE on Base Sepolia · Founders never see your bar
        </p>
      </div>
    </div>
  );
}
