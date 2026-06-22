import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#080B12",
      color: "#F3F4F6",
      fontFamily: "'Inter', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        :root {
          --black: #080B12; --surface: #0D1117; --card: #111827;
          --border: #1F2937; --border2: #374151;
          --cyan: #00E5CC; --cyan-dim: rgba(0,229,204,0.12);
          --text: #F3F4F6; --muted: #9CA3AF; --muted2: #6B7280;
        }
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; background: rgba(8,11,18,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-logo-icon { width: 32px; height: 32px; background: var(--cyan); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .nav-logo-text { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; color: var(--text); }
        .nav-logo-sub { font-size: 11px; color: var(--muted); font-family: 'Space Mono', monospace; }
        .nav-right { display: flex; align-items: center; gap: 24px; }
        .nav-link { color: var(--muted); text-decoration: none; font-size: 14px; font-weight: 500; }
        .nav-cta { background: var(--cyan); color: #080B12; border: none; border-radius: 8px; padding: 9px 20px; font-weight: 700; font-size: 13px; font-family: 'Space Grotesk', sans-serif; cursor: pointer; text-decoration: none; }
        .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 120px 24px 80px; position: relative; overflow: hidden; text-align: center; }
        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,229,204,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,204,0.04) 1px, transparent 1px); background-size: 48px 48px; mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%); }
        .hero-glow { position: absolute; width: 600px; height: 400px; background: radial-gradient(ellipse, rgba(0,229,204,0.08) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -60%); pointer-events: none; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--cyan-dim); border: 1px solid rgba(0,229,204,0.3); border-radius: 20px; padding: 6px 14px; font-size: 12px; font-family: 'Space Mono', monospace; color: var(--cyan); margin-bottom: 32px; position: relative; }
        .badge-dot { width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .hero-headline { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: clamp(36px, 6vw, 72px); line-height: 1.05; letter-spacing: -0.02em; max-width: 820px; margin-bottom: 24px; position: relative; }
        .hero-headline em { font-style: normal; color: var(--cyan); }
        .hero-sub { font-size: clamp(16px, 2vw, 20px); color: var(--muted); max-width: 560px; margin-bottom: 48px; line-height: 1.6; position: relative; }
        .hero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; }
        .btn-primary { background: var(--cyan); color: #080B12; border: none; border-radius: 10px; padding: 14px 32px; font-weight: 700; font-size: 15px; font-family: 'Space Grotesk', sans-serif; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(0,229,204,0.3); }
        .btn-secondary { background: transparent; color: var(--text); border: 1px solid var(--border2); border-radius: 10px; padding: 14px 32px; font-weight: 600; font-size: 15px; font-family: 'Space Grotesk', sans-serif; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; }
        .btn-secondary:hover { border-color: var(--cyan); color: var(--cyan); }
        .demo-strip { width: 100%; max-width: 760px; margin: 64px auto 0; position: relative; }
        .demo-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 24px 28px; display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; align-items: center; }
        .demo-side-label { font-size: 11px; font-family: 'Space Mono', monospace; color: var(--muted2); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
        .demo-metric { display: flex; flex-direction: column; gap: 8px; }
        .demo-row { display: flex; align-items: center; justify-content: space-between; background: var(--surface); border-radius: 8px; padding: 8px 12px; font-size: 13px; }
        .demo-row-label { color: var(--muted); }
        .demo-row-value { font-family: 'Space Mono', monospace; font-size: 12px; }
        .demo-row-value.visible { color: var(--cyan); }
        .demo-arrow { display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--muted2); font-size: 12px; font-family: 'Space Mono', monospace; }
        .demo-arrow-icon { width: 40px; height: 40px; background: var(--cyan-dim); border: 1px solid rgba(0,229,204,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--cyan); font-size: 18px; }
        .demo-result-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-radius: 8px; font-size: 13px; background: var(--surface); border-left: 2px solid #10B981; margin-bottom: 8px; }
        .demo-result-label { color: var(--muted); }
        .demo-result-value { font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; color: #10B981; }
        .demo-caption { text-align: center; margin-top: 14px; font-size: 12px; color: var(--muted2); font-family: 'Space Mono', monospace; }
        .problem-section { padding: 100px 24px; border-top: 1px solid var(--border); }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-eyebrow { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--cyan); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 16px; }
        .section-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: clamp(28px, 4vw, 44px); line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 20px; }
        .section-body { color: var(--muted); font-size: 17px; line-height: 1.7; max-width: 600px; }
        .problem-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 48px; }
        .problem-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 24px; }
        .problem-icon { font-size: 24px; margin-bottom: 14px; }
        .problem-title { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 16px; margin-bottom: 8px; }
        .problem-body { font-size: 14px; color: var(--muted); line-height: 1.6; }
        .hiw-section { padding: 100px 24px; background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .hiw-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0; margin-top: 56px; }
        .hiw-step { padding: 32px; }
        .hiw-step-num { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--cyan); letter-spacing: 0.1em; margin-bottom: 20px; }
        .hiw-step-icon { width: 48px; height: 48px; background: var(--cyan-dim); border: 1px solid rgba(0,229,204,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 16px; }
        .hiw-step-title { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 17px; margin-bottom: 10px; }
        .hiw-step-body { font-size: 14px; color: var(--muted); line-height: 1.6; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2px; background: var(--border); border-radius: 16px; overflow: hidden; margin: 80px 24px; max-width: 1100px; }
        .stat-item { background: var(--card); padding: 40px 32px; text-align: center; }
        .stat-num { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 40px; color: var(--cyan); line-height: 1; margin-bottom: 8px; }
        .stat-label { font-size: 14px; color: var(--muted); }
        .fhe-section { padding: 100px 24px; max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .fhe-code { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 28px; font-family: 'Space Mono', monospace; font-size: 12px; line-height: 1.8; color: var(--muted); }
        .fhe-code-header { font-size: 10px; color: var(--cyan); letter-spacing: 0.15em; margin-bottom: 16px; border-bottom: 1px solid var(--border); padding-bottom: 12px; }
        .fhe-points { display: flex; flex-direction: column; gap: 20px; margin-top: 32px; }
        .fhe-point { display: flex; gap: 14px; align-items: flex-start; }
        .fhe-point-icon { width: 32px; height: 32px; background: var(--cyan-dim); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; margin-top: 2px; }
        .fhe-point-title { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; margin-bottom: 4px; }
        .fhe-point-body { font-size: 14px; color: var(--muted); line-height: 1.5; }
        .cta-section { padding: 120px 24px; text-align: center; position: relative; overflow: hidden; }
        .cta-glow { position: absolute; width: 500px; height: 300px; background: radial-gradient(ellipse, rgba(0,229,204,0.07) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; }
        .footer { border-top: 1px solid var(--border); padding: 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .footer-built { font-size: 12px; color: var(--muted2); }
        .footer-built a { color: var(--cyan); text-decoration: none; }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-size: 13px; color: var(--muted2); text-decoration: none; }
        @media (max-width: 768px) {
          .nav { padding: 16px 20px; }
          .fhe-section { grid-template-columns: 1fr; gap: 40px; }
          .demo-card { grid-template-columns: 1fr; }
          .footer { flex-direction: column; }
          .stats-grid { margin: 40px 24px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon">⚡</div>
          <div>
            <div className="nav-logo-text">FundMatch</div>
            <div className="nav-logo-sub">Powered by CoFHE</div>
          </div>
        </a>
        <div className="nav-right">
          <a href="#how-it-works" className="nav-link">How it works</a>
          <a href="#technology" className="nav-link">Technology</a>
          <Link href="/launch" className="nav-cta">Launch App →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <div className="hero-badge">
          <div className="badge-dot"></div>
          Built on Fhenix CoFHE · Base Sepolia
        </div>
        <h1 className="hero-headline">
          Find your next investor<br/>
          <em>without exposing</em><br/>
          your startup.
        </h1>
        <p className="hero-sub">
          FundMatch connects founders and investors using Fully Homomorphic Encryption.
          Your ARR, growth, and runway stay encrypted — even during matching.
        </p>
        <div className="hero-actions">
          <Link href="/launch" className="btn-primary">Get matched now →</Link>
          <a href="#how-it-works" className="btn-secondary">See how it works</a>
        </div>

        {/* Demo strip */}
        <div className="demo-strip">
          <div className="demo-card">
            <div>
              <div className="demo-side-label">🚀 Founder submits</div>
              <div className="demo-metric">
                <div className="demo-row"><span className="demo-row-label">ARR</span><span className="demo-row-value visible">$250k</span></div>
                <div className="demo-row"><span className="demo-row-label">Growth</span><span className="demo-row-value visible">18% MoM</span></div>
                <div className="demo-row"><span className="demo-row-label">Runway</span><span className="demo-row-value visible">15 months</span></div>
              </div>
            </div>
            <div className="demo-arrow">
              <div className="demo-arrow-icon">🔒</div>
              <span>FHE</span>
            </div>
            <div>
              <div className="demo-side-label">💼 Investor sees</div>
              <div className="demo-result-row"><span className="demo-result-label">ARR requirement</span><span className="demo-result-value">✓ MET</span></div>
              <div className="demo-result-row"><span className="demo-result-label">Growth requirement</span><span className="demo-result-value">✓ MET</span></div>
              <div className="demo-result-row"><span className="demo-result-label">Runway requirement</span><span className="demo-result-value">✓ MET</span></div>
            </div>
          </div>
          <div className="demo-caption">Actual numbers never leave the founder's browser in plaintext</div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem-section">
        <div className="section-inner">
          <div className="section-eyebrow">The problem</div>
          <h2 className="section-title">Fundraising forces founders<br/>to expose what competitors crave.</h2>
          <p className="section-body">Every pitch deck, data room, and investor update leaks sensitive metrics. Your ARR, growth rate, and runway are your competitive advantage — not a number to broadcast.</p>
          <div className="problem-grid">
            <div className="problem-card"><div className="problem-icon">👀</div><div className="problem-title">Competitors pose as investors</div><div className="problem-body">Sharing your metrics means sharing them with anyone who books a call. There's no way to verify intent before revealing sensitive data.</div></div>
            <div className="problem-card"><div className="problem-icon">📊</div><div className="problem-title">Data rooms have no privacy</div><div className="problem-body">Traditional due diligence requires founders to hand over exact numbers that define their competitive position — to strangers.</div></div>
            <div className="problem-card"><div className="problem-icon">🔗</div><div className="problem-title">On-chain is fully transparent</div><div className="problem-body">Blockchain solves trust but not privacy. Without FHE, every metric submitted on-chain is readable by anyone — forever.</div></div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="hiw-section" id="how-it-works">
        <div className="section-inner">
          <div className="section-eyebrow">How it works</div>
          <h2 className="section-title">Three steps. Zero exposure.</h2>
          <div className="hiw-steps">
            <div className="hiw-step"><div className="hiw-step-num">STEP 01</div><div className="hiw-step-icon">🚀</div><div className="hiw-step-title">Founders register privately</div><div className="hiw-step-body">Enter your real ARR, growth, runway, industry, and stage. Your browser encrypts every number before it leaves your device. Nothing goes on-chain in plaintext.</div></div>
            <div className="hiw-step"><div className="hiw-step-num">STEP 02</div><div className="hiw-step-icon">💼</div><div className="hiw-step-title">Investors set encrypted criteria</div><div className="hiw-step-body">Investors define their minimum thresholds — all encrypted. Founders never know what bar they need to clear.</div></div>
            <div className="hiw-step"><div className="hiw-step-num">STEP 03</div><div className="hiw-step-icon">⚡</div><div className="hiw-step-title">FHE computes the match</div><div className="hiw-step-body">CoFHE's coprocessor runs comparisons entirely on encrypted data. Results are revealed. The actual numbers on both sides remain permanently hidden.</div></div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{display:"flex",justifyContent:"center"}}>
        <div className="stats-grid">
          <div className="stat-item"><div className="stat-num">0</div><div className="stat-label">Raw metrics exposed on-chain</div></div>
          <div className="stat-item"><div className="stat-num">3</div><div className="stat-label">Smart contracts on Base Sepolia</div></div>
          <div className="stat-item"><div className="stat-num">FHE</div><div className="stat-label">Grade encryption — not a promise</div></div>
          <div className="stat-item"><div className="stat-num">∞</div><div className="stat-label">Matches computable privately</div></div>
        </div>
      </div>

      {/* FHE EXPLAINER */}
      <section className="fhe-section" id="technology">
        <div>
          <div className="section-eyebrow">The technology</div>
          <h2 className="section-title">Real encryption.<br/>Not a privacy promise.</h2>
          <p className="section-body">FundMatch is built on Fhenix's CoFHE — a Fully Homomorphic Encryption coprocessor that performs comparisons on encrypted integers without ever decrypting them.</p>
          <div className="fhe-points">
            <div className="fhe-point"><div className="fhe-point-icon">🔒</div><div><div className="fhe-point-title">Encrypted end-to-end</div><div className="fhe-point-body">Data is encrypted in the browser before submission. The blockchain, CoFHE, and FundMatch itself never see raw numbers.</div></div></div>
            <div className="fhe-point"><div className="fhe-point-icon">⚡</div><div><div className="fhe-point-title">On-chain verified</div><div className="fhe-point-body">Match results are computed and stored on Base Sepolia. No centralized server, no trusted intermediary — just math and the blockchain.</div></div></div>
            <div className="fhe-point"><div className="fhe-point-icon">🛡️</div><div><div className="fhe-point-title">Threshold decryption</div><div className="fhe-point-body">Results revealed only to authorized parties via Fhenix's Threshold Network — a distributed multi-party system, not a single key holder.</div></div></div>
          </div>
        </div>
        <div className="fhe-code">
          <div className="fhe-code-header">FHE MATCHING LOGIC</div>
          <span style={{color:"#7B5EA7"}}>function</span> <span style={{color:"#00E5CC"}}>computeMatch</span>(<br/>
          &nbsp;&nbsp;address investor,<br/>
          &nbsp;&nbsp;address founder<br/>
          ) <span style={{color:"#7B5EA7"}}>external</span> {"{"}<br/><br/>
          &nbsp;&nbsp;<span style={{color:"#6B7280"}}>// FHE comparison — no decryption</span><br/>
          &nbsp;&nbsp;ebool arrOk = <span style={{color:"#00E5CC"}}>FHE.gte</span>(<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;founderARR, investorMinARR<br/>
          &nbsp;&nbsp;);<br/><br/>
          &nbsp;&nbsp;<span style={{color:"#6B7280"}}>// Encrypted score — 0 or 25</span><br/>
          &nbsp;&nbsp;euint32 score = <span style={{color:"#00E5CC"}}>FHE.select</span>(<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;arrOk, twenty5, zero<br/>
          &nbsp;&nbsp;);<br/><br/>
          &nbsp;&nbsp;<span style={{color:"#6B7280"}}>// Grant access to result only</span><br/>
          &nbsp;&nbsp;<span style={{color:"#00E5CC"}}>FHE.allow</span>(score, investor);<br/>
          &nbsp;&nbsp;<span style={{color:"#00E5CC"}}>FHE.allow</span>(score, founder);<br/>
          {"}"}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow"></div>
        <div className="section-eyebrow" style={{position:"relative"}}>Ready to match privately</div>
        <h2 className="section-title" style={{maxWidth:"600px",margin:"0 auto 16px",position:"relative"}}>
          Your metrics are yours.<br/>
          <em style={{fontStyle:"normal",color:"#00E5CC"}}>Keep them that way.</em>
        </h2>
        <p className="section-body" style={{margin:"0 auto 40px",position:"relative"}}>
          Register as a founder or investor. FundMatch computes your compatibility without either side revealing what's behind the curtain.
        </p>
        <div className="hero-actions" style={{position:"relative"}}>
          <Link href="/launch" className="btn-primary">Find your match →</Link>
          <a href="https://cofhe-docs.fhenix.zone" target="_blank" className="btn-secondary">Read the CoFHE docs</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <div className="nav-logo-icon" style={{width:"24px",height:"24px",fontSize:"12px"}}>⚡</div>
          <span className="footer-built">FundMatch · Built on <a href="https://fhenix.io" target="_blank">Fhenix CoFHE</a> · Deployed on Base Sepolia</span>
        </div>
        <div className="footer-links">
          <a href="https://github.com/lucylovelyn/Fundmatch" target="_blank">GitHub</a>
          <a href="https://cofhe-docs.fhenix.zone" target="_blank">CoFHE Docs</a>
          <Link href="/launch">Launch App</Link>
        </div>
      </footer>
    </div>
  );
}