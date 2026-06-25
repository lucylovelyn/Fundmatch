"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import FounderScreen from "../components/FounderScreen";
import InvestorScreen from "../components/InvestorScreen";
import MatchScreen from "../components/MatchScreen";

function LandingPage({ onLaunch }) {
  return (
    <div style={{minHeight:"100vh",background:"#080B12",color:"#F3F4F6",fontFamily:"'Inter',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&family=Space+Mono:wght@400;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        .lp-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 40px;display:flex;align-items:center;justify-content:space-between;background:rgba(8,11,18,0.9);backdrop-filter:blur(12px);border-bottom:1px solid #1F2937}
        .lp-logo{display:flex;align-items:center;gap:10px}
        .lp-logo-icon{width:32px;height:32px;background:#00E5CC;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px}
        .lp-logo-text{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;color:#F3F4F6}
        .lp-logo-sub{font-size:11px;color:#9CA3AF;font-family:'Space Mono',monospace}
        .lp-nav-cta{background:#00E5CC;color:#080B12;border:none;border-radius:8px;padding:9px 20px;font-weight:700;font-size:13px;font-family:'Space Grotesk',sans-serif;cursor:pointer}
        .lp-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px 24px 80px;position:relative;overflow:hidden;text-align:center}
        .lp-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,229,204,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,204,0.04) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 80% 60% at 50% 50%,black 30%,transparent 100%)}
        .lp-glow{position:absolute;width:600px;height:400px;background:radial-gradient(ellipse,rgba(0,229,204,0.08) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-60%);pointer-events:none}
        .lp-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,229,204,0.12);border:1px solid rgba(0,229,204,0.3);border-radius:20px;padding:6px 14px;font-size:12px;font-family:'Space Mono',monospace;color:#00E5CC;margin-bottom:32px;position:relative}
        .lp-dot{width:6px;height:6px;background:#00E5CC;border-radius:50%;animation:lp-pulse 2s ease-in-out infinite}
        @keyframes lp-pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .lp-h1{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(36px,6vw,72px);line-height:1.05;letter-spacing:-0.02em;max-width:820px;margin-bottom:24px;position:relative}
        .lp-h1 em{font-style:normal;color:#00E5CC}
        .lp-sub{font-size:clamp(16px,2vw,20px);color:#9CA3AF;max-width:560px;margin-bottom:48px;line-height:1.6;position:relative}
        .lp-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative}
        .lp-btn-p{background:#00E5CC;color:#080B12;border:none;border-radius:10px;padding:14px 32px;font-weight:700;font-size:15px;font-family:'Space Grotesk',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all 0.2s}
        .lp-btn-p:hover{transform:translateY(-1px);box-shadow:0 8px 32px rgba(0,229,204,0.3)}
        .lp-btn-s{background:transparent;color:#F3F4F6;border:1px solid #374151;border-radius:10px;padding:14px 32px;font-weight:600;font-size:15px;font-family:'Space Grotesk',sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:8px;text-decoration:none}
        .lp-demo{width:100%;max-width:760px;margin:64px auto 0}
        .lp-demo-card{background:#111827;border:1px solid #1F2937;border-radius:16px;padding:24px 28px;display:grid;grid-template-columns:1fr auto 1fr;gap:24px;align-items:center}
        .lp-demo-label{font-size:11px;font-family:'Space Mono',monospace;color:#6B7280;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px}
        .lp-demo-metric{display:flex;flex-direction:column;gap:8px}
        .lp-demo-row{display:flex;align-items:center;justify-content:space-between;background:#0D1117;border-radius:8px;padding:8px 12px;font-size:13px}
        .lp-demo-val{font-family:'Space Mono',monospace;font-size:12px;color:#00E5CC}
        .lp-demo-arrow{display:flex;flex-direction:column;align-items:center;gap:8px;color:#6B7280;font-size:12px;font-family:'Space Mono',monospace}
        .lp-demo-arrow-icon{width:40px;height:40px;background:rgba(0,229,204,0.12);border:1px solid rgba(0,229,204,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#00E5CC;font-size:18px}
        .lp-demo-result{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:8px;font-size:13px;background:#0D1117;border-left:2px solid #10B981;margin-bottom:8px}
        .lp-demo-result-val{font-family:'Space Mono',monospace;font-size:11px;font-weight:700;color:#10B981}
        .lp-demo-caption{text-align:center;margin-top:14px;font-size:12px;color:#6B7280;font-family:'Space Mono',monospace}
        .lp-section{padding:100px 24px;max-width:1100px;margin:0 auto}
        .lp-eyebrow{font-family:'Space Mono',monospace;font-size:11px;color:#00E5CC;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:16px}
        .lp-h2{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(28px,4vw,44px);line-height:1.1;letter-spacing:-0.02em;margin-bottom:20px}
        .lp-body{color:#9CA3AF;font-size:17px;line-height:1.7;max-width:600px}
        .lp-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-top:48px}
        .lp-card{background:#111827;border:1px solid #1F2937;border-radius:14px;padding:24px}
        .lp-card-icon{font-size:24px;margin-bottom:14px}
        .lp-card-title{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:16px;margin-bottom:8px}
        .lp-card-body{font-size:14px;color:#9CA3AF;line-height:1.6}
        .lp-hiw{padding:100px 24px;background:#0D1117;border-top:1px solid #1F2937;border-bottom:1px solid #1F2937}
        .lp-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:0;margin-top:56px}
        .lp-step{padding:32px}
        .lp-step-num{font-family:'Space Mono',monospace;font-size:11px;color:#00E5CC;letter-spacing:0.1em;margin-bottom:20px}
        .lp-step-icon{width:48px;height:48px;background:rgba(0,229,204,0.12);border:1px solid rgba(0,229,204,0.2);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:16px}
        .lp-step-title{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:17px;margin-bottom:10px}
        .lp-step-body{font-size:14px;color:#9CA3AF;line-height:1.6}
        .lp-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2px;background:#1F2937;border-radius:16px;overflow:hidden;margin:80px 24px;max-width:1100px}
        .lp-stat{background:#111827;padding:40px 32px;text-align:center}
        .lp-stat-num{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:40px;color:#00E5CC;line-height:1;margin-bottom:8px}
        .lp-stat-label{font-size:14px;color:#9CA3AF}
        .lp-cta{padding:120px 24px;text-align:center;position:relative;overflow:hidden}
        .lp-cta-glow{position:absolute;width:500px;height:300px;background:radial-gradient(ellipse,rgba(0,229,204,0.07) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
        .lp-footer{border-top:1px solid #1F2937;padding:40px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
        .lp-footer-built{font-size:12px;color:#6B7280}
        .lp-footer-built a{color:#00E5CC;text-decoration:none}
        .lp-footer-links{display:flex;gap:24px}
        .lp-footer-links a{font-size:13px;color:#6B7280;text-decoration:none}
        @media(max-width:768px){.lp-nav{padding:16px 20px}.lp-demo-card{grid-template-columns:1fr}.lp-footer{flex-direction:column}}
      `}</style>

      <nav className="lp-nav">
        <div className="lp-logo">
          <div className="lp-logo-icon">⚡</div>
          <div>
            <div className="lp-logo-text">FundMatch</div>
            <div className="lp-logo-sub">Powered by CoFHE</div>
          </div>
        </div>
        <button className="lp-nav-cta" onClick={onLaunch}>Launch App →</button>
      </nav>

      <section className="lp-hero">
        <div className="lp-grid"></div>
        <div className="lp-glow"></div>
        <div className="lp-badge"><div className="lp-dot"></div>Built on Fhenix CoFHE · Base Sepolia</div>
        <h1 className="lp-h1">Find your next investor<br/><em>without exposing</em><br/>your startup.</h1>
        <p className="lp-sub">FundMatch connects founders and investors using Fully Homomorphic Encryption. Your ARR, growth, and runway stay encrypted — even during matching.</p>
        <div className="lp-actions">
          <button className="lp-btn-p" onClick={onLaunch}>Get matched now →</button>
          <a href="#how-it-works" className="lp-btn-s">See how it works</a>
        </div>
        <div className="lp-demo">
          <div className="lp-demo-card">
            <div>
              <div className="lp-demo-label">🚀 Founder submits</div>
              <div className="lp-demo-metric">
                <div className="lp-demo-row"><span style={{color:"#9CA3AF"}}>ARR</span><span className="lp-demo-val">$250k</span></div>
                <div className="lp-demo-row"><span style={{color:"#9CA3AF"}}>Growth</span><span className="lp-demo-val">18% MoM</span></div>
                <div className="lp-demo-row"><span style={{color:"#9CA3AF"}}>Runway</span><span className="lp-demo-val">15 months</span></div>
              </div>
            </div>
            <div className="lp-demo-arrow"><div className="lp-demo-arrow-icon">🔒</div><span>FHE</span></div>
            <div>
              <div className="lp-demo-label">💼 Investor sees</div>
              <div className="lp-demo-result"><span style={{color:"#9CA3AF"}}>ARR requirement</span><span className="lp-demo-result-val">✓ MET</span></div>
              <div className="lp-demo-result"><span style={{color:"#9CA3AF"}}>Growth requirement</span><span className="lp-demo-result-val">✓ MET</span></div>
              <div className="lp-demo-result"><span style={{color:"#9CA3AF"}}>Runway requirement</span><span className="lp-demo-result-val">✓ MET</span></div>
            </div>
          </div>
          <div className="lp-demo-caption">Actual numbers never leave the founder's browser in plaintext</div>
        </div>
      </section>

      <section style={{padding:"100px 24px",borderTop:"1px solid #1F2937"}}>
        <div className="lp-section" style={{padding:0}}>
          <div className="lp-eyebrow">The problem</div>
          <h2 className="lp-h2">Fundraising forces founders<br/>to expose what competitors crave.</h2>
          <p className="lp-body">Every pitch deck, data room, and investor update leaks sensitive metrics. Your ARR, growth rate, and runway are your competitive advantage — not a number to broadcast.</p>
          <div className="lp-cards">
            <div className="lp-card"><div className="lp-card-icon">👀</div><div className="lp-card-title">Competitors pose as investors</div><div className="lp-card-body">Sharing your metrics means sharing them with anyone who books a call. There's no way to verify intent before revealing sensitive data.</div></div>
            <div className="lp-card"><div className="lp-card-icon">📊</div><div className="lp-card-title">Data rooms have no privacy</div><div className="lp-card-body">Traditional due diligence requires founders to hand over exact numbers that define their competitive position — to strangers.</div></div>
            <div className="lp-card"><div className="lp-card-icon">🔗</div><div className="lp-card-title">On-chain is fully transparent</div><div className="lp-card-body">Blockchain solves trust but not privacy. Without FHE, every metric submitted on-chain is readable by anyone — forever.</div></div>
          </div>
        </div>
      </section>

      <section className="lp-hiw" id="how-it-works">
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div className="lp-eyebrow">How it works</div>
          <h2 className="lp-h2">Three steps. Zero exposure.</h2>
          <div className="lp-steps">
            <div className="lp-step"><div className="lp-step-num">STEP 01</div><div className="lp-step-icon">🚀</div><div className="lp-step-title">Founders register privately</div><div className="lp-step-body">Enter your real ARR, growth, runway, industry, and stage. Your browser encrypts every number before it leaves your device. Nothing goes on-chain in plaintext.</div></div>
            <div className="lp-step"><div className="lp-step-num">STEP 02</div><div className="lp-step-icon">💼</div><div className="lp-step-title">Investors set encrypted criteria</div><div className="lp-step-body">Investors define minimum thresholds — all encrypted. Founders never know what bar they need to clear.</div></div>
            <div className="lp-step"><div className="lp-step-num">STEP 03</div><div className="lp-step-icon">⚡</div><div className="lp-step-title">FHE computes the match</div><div className="lp-step-body">CoFHE's coprocessor runs comparisons entirely on encrypted data. Results are revealed. The actual numbers on both sides remain permanently hidden.</div></div>
          </div>
        </div>
      </section>

      <div style={{display:"flex",justifyContent:"center"}}>
        <div className="lp-stats">
          <div className="lp-stat"><div className="lp-stat-num">0</div><div className="lp-stat-label">Raw metrics exposed on-chain</div></div>
          <div className="lp-stat"><div className="lp-stat-num">3</div><div className="lp-stat-label">Smart contracts on Base Sepolia</div></div>
          <div className="lp-stat"><div className="lp-stat-num">FHE</div><div className="lp-stat-label">Grade encryption — not a promise</div></div>
          <div className="lp-stat"><div className="lp-stat-num">∞</div><div className="lp-stat-label">Matches computable privately</div></div>
        </div>
      </div>

      <section className="lp-cta">
        <div className="lp-cta-glow"></div>
        <div className="lp-eyebrow" style={{position:"relative"}}>Ready to match privately</div>
        <h2 className="lp-h2" style={{maxWidth:"600px",margin:"0 auto 16px",position:"relative"}}>Your metrics are yours.<br/><em style={{fontStyle:"normal",color:"#00E5CC"}}>Keep them that way.</em></h2>
        <p className="lp-body" style={{margin:"0 auto 40px",position:"relative"}}>Register as a founder or investor. FundMatch computes your compatibility without either side revealing what's behind the curtain.</p>
        <div className="lp-actions" style={{position:"relative"}}>
          <button className="lp-btn-p" onClick={onLaunch}>Find your match →</button>
          <a href="https://cofhe-docs.fhenix.zone" target="_blank" className="lp-btn-s">Read the CoFHE docs</a>
        </div>
      </section>

      <footer className="lp-footer">
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <div className="lp-logo-icon" style={{width:"24px",height:"24px",fontSize:"12px"}}>⚡</div>
          <span className="lp-footer-built">FundMatch · Built on <a href="https://fhenix.io" target="_blank">Fhenix CoFHE</a> · Deployed on Base Sepolia</span>
        </div>
        <div className="lp-footer-links">
          <a href="https://github.com/lucylovelyn/Fundmatch" target="_blank">GitHub</a>
          <a href="https://cofhe-docs.fhenix.zone" target="_blank">CoFHE Docs</a>
        </div>
      </footer>
    </div>
  );
}

function AppScreens() {
  const [activeTab, setActiveTab] = useState("founder");
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const tabs = [
    { id: "founder", label: "I'm a Founder", icon: "🚀" },
    { id: "investor", label: "I'm an Investor", icon: "💼" },
    { id: "match", label: "Match Engine", icon: "⚡" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface)" }}>
      <header style={{ background: "white", borderBottom: "1px solid var(--border)", padding: "0 24px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "var(--brand)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: "var(--text)", lineHeight: 1.1 }}>FundMatch</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Powered by FHE</div>
            </div>
          </div>
          <div>
            {isConnected ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "6px 12px", fontSize: 12, color: "#16a34a", fontWeight: 500 }}>
                  🟢 {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
                <button onClick={() => disconnect()} style={{ fontSize: 12, color: "var(--muted)", background: "none", border: "none", cursor: "pointer", padding: "6px 8px" }}>Disconnect</button>
              </div>
            ) : (
              <button onClick={() => connect({ connector: connectors[0] })} style={{ background: "var(--brand)", color: "white", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Connect Wallet</button>
            )}
          </div>
        </div>
      </header>
      <div style={{ background: "white", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", padding: "0 24px", gap: 4 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "14px 20px", border: "none", background: "none", cursor: "pointer", fontWeight: activeTab === tab.id ? 600 : 400, fontSize: 14, color: activeTab === tab.id ? "var(--brand)" : "var(--muted)", borderBottom: activeTab === tab.id ? "2px solid var(--brand)" : "2px solid transparent", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6 }}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "12px 16px", marginBottom: 28, display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#1d4ed8" }}>
          <span style={{ fontSize: 16 }}>🔒</span>
          <span><strong>All data is encrypted end-to-end using Fully Homomorphic Encryption.</strong> Your actual numbers are never exposed — not on-chain, not to the other party, not to FundMatch.</span>
        </div>
        {activeTab === "founder" && <FounderScreen />}
        {activeTab === "investor" && <InvestorScreen />}
        {activeTab === "match" && <MatchScreen />}
      </main>
    </div>
  );
}

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  if (showApp) return <AppScreens />;
  return <LandingPage onLaunch={() => setShowApp(true)} />;
}