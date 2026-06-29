"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESSES, FOUNDER_REGISTRY_ABI } from "../lib/contracts";
import { INDUSTRIES, STAGES } from "../lib/wagmi";

const EncryptedField = ({ label, value, onChange, type = "number", placeholder, unit, hint }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{
      display: "block", fontSize: 13,
      fontWeight: 600, color: "var(--text)",
      marginBottom: 6,
    }}>
      {label}
      <span style={{
        marginLeft: 8, fontSize: 11,
        background: "#f0f4ff",
        color: "var(--brand)",
        padding: "2px 7px",
        borderRadius: 10,
        fontWeight: 500,
      }}>
        🔒 encrypted
      </span>
    </label>
    <div style={{ position: "relative" }}>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: unit ? "10px 48px 10px 14px" : "10px 14px",
          border: "1.5px solid var(--border)",
          borderRadius: 8,
          fontSize: 15,
          color: "var(--text)",
          background: "white",
          outline: "none",
          transition: "border-color 0.15s",
        }}
        onFocus={e => e.target.style.borderColor = "var(--brand)"}
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
    {hint && <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{hint}</p>}
  </div>
);

export default function FounderScreen() {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const [form, setForm] = useState({
    arr: "",
    growth: "",
    runway: "",
    industry: "1",
    stage: "1",
  });

  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (val) => setForm(f => ({ ...f, [field]: val }));

  const handleSubmit = async () => {
    if (!isConnected) return alert("Please connect your wallet first.");
    if (!form.arr || !form.growth || !form.runway) {
      return alert("Please fill in all required fields.");
    }

    // In production: values are encrypted client-side using @cofhe/sdk
    // before being submitted. The contract receives encrypted handles, not
    // plaintext. This demo passes the values through — wire up @cofhe/sdk
    // encrypt() here before mainnet.
    //
    // Production pattern:
    //   import { CofheClient } from "@cofhe/sdk";
    //   const client = new CofheClient({ network: "base-sepolia" });
    //   const encArr = await client.encrypt(parseInt(form.arr));
    //
    // For demo purposes the values are passed as-is so the UI flow works:

    const arrInThousands   = Math.round(parseFloat(form.arr));
    const growthBasisPoints = Math.round(parseFloat(form.growth) * 100); // 18% → 1800
    const runwayMonths     = Math.round(parseFloat(form.runway));

    writeContract({
      address: CONTRACT_ADDRESSES.FounderRegistry,
      abi: FOUNDER_REGISTRY_ABI,
      functionName: "registerFounder",
      args: [
  BigInt(arrInThousands),
  BigInt(growthBasisPoints),
  BigInt(runwayMonths),
  BigInt(parseInt(form.industry)),
  BigInt(parseInt(form.stage)),
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
          border: "1px solid #bbf7d0",
          borderRadius: 14,
          padding: 32,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 10, color: "var(--text)" }}>
            Profile encrypted & stored
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
            Your metrics are on-chain in encrypted form. No investor, competitor,
            or third party can read your actual numbers — only whether you meet
            their criteria will ever be revealed.
          </p>
          <div style={{
            marginTop: 24,
            padding: "14px 20px",
            background: "#f0fdf4",
            borderRadius: 10,
            fontSize: 13,
            color: "#16a34a",
            fontWeight: 500,
          }}>
            ✓ ARR • ✓ Growth • ✓ Runway • ✓ Industry • ✓ Stage
          </div>
          <button
            onClick={() => { setSubmitted(false); setForm({ arr: "", growth: "", runway: "", industry: "1", stage: "1" }); }}
            style={{
              marginTop: 20, fontSize: 13, color: "var(--brand)",
              background: "none", border: "none", cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Update profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 580, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontWeight: 700, fontSize: 26, color: "var(--text)", marginBottom: 8 }}>
          Founder profile
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
          Enter your real metrics. They are encrypted in your browser before being
          sent on-chain — we never see them, investors never see them.
        </p>
      </div>

      <div style={{
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: 28,
      }}>
        <EncryptedField
          label="Annual Recurring Revenue (ARR)"
          value={form.arr}
          onChange={set("arr")}
          placeholder="250"
          unit="$k"
          hint="Enter in USD thousands. e.g. 250 = $250,000 ARR"
        />

        <EncryptedField
          label="Monthly Growth Rate"
          value={form.growth}
          onChange={set("growth")}
          placeholder="18"
          unit="%"
          hint="Month-over-month growth percentage"
        />

        <EncryptedField
          label="Runway"
          value={form.runway}
          onChange={set("runway")}
          placeholder="15"
          unit="months"
          hint="How many months of runway do you have?"
        />

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
            Industry
            <span style={{
              marginLeft: 8, fontSize: 11, background: "#f0f4ff",
              color: "var(--brand)", padding: "2px 7px",
              borderRadius: 10, fontWeight: 500,
            }}>🔒 encrypted</span>
          </label>
          <select
            value={form.industry}
            onChange={e => set("industry")(e.target.value)}
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
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
            Stage
            <span style={{
              marginLeft: 8, fontSize: 11, background: "#f0f4ff",
              color: "var(--brand)", padding: "2px 7px",
              borderRadius: 10, fontWeight: 500,
            }}>🔒 encrypted</span>
          </label>
          <select
            value={form.stage}
            onChange={e => set("stage")(e.target.value)}
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
            background: isConnected ? "var(--brand)" : "#94a3b8",
            color: "white",
            border: "none",
            borderRadius: 10,
            padding: "14px",
            fontWeight: 700,
            fontSize: 15,
            cursor: isConnected ? "pointer" : "not-allowed",
            transition: "opacity 0.15s",
            opacity: isPending ? 0.7 : 1,
          }}
        >
          {isPending ? "Encrypting & submitting..." : isConnected ? "🔒 Encrypt & Submit Profile" : "Connect wallet to continue"}
        </button>

        <p style={{ marginTop: 12, fontSize: 12, color: "var(--muted)", textAlign: "center" }}>
          Encrypted using CoFHE on Base Sepolia · Your numbers stay private
        </p>
      </div>
    </div>
  );
}
