# ⚡ FundMatch
**Find your next investor without exposing your startup.**

Private startup fundraising powered by Fully Homomorphic Encryption (FHE).
Deployed on Base Sepolia via the CoFHE coprocessor.

---

## How it works

1. **Founders** enter ARR, growth, runway, industry, stage → encrypted client-side → stored on-chain
2. **Investors** enter minimum thresholds → encrypted → stored on-chain
3. **Match Engine** computes compatibility entirely on encrypted data using FHE
4. Only boolean results (met / not met) are revealed — never the actual numbers

---

## Quick start

### Prerequisites
- Node.js 18+
- MetaMask with Base Sepolia ETH
  - Get free testnet ETH: https://faucet.quicknode.com/base/sepolia

### 1. Install dependencies

```bash
# Root (Hardhat + contracts)
npm install

# Frontend (Next.js)
cd frontend && npm install && cd ..
```

### 2. Configure environment

```bash
cp .env.example .env
```

Open `.env` and fill in:
- `PRIVATE_KEY` — your MetaMask wallet private key (for deploying contracts)
  - Export from MetaMask: Account → ... → Account Details → Export Private Key
  - ⚠️  Never share this or commit it to git
- `BASESEPOLIA_RPC_URL` — leave as default or use your own Alchemy/Infura endpoint

### 3. Compile contracts

```bash
npm run compile
```

You should see:
```
Compiled 3 Solidity files successfully
```

### 4. Deploy to Base Sepolia

```bash
npm run deploy:basesepolia
```

This deploys all 3 contracts and writes their addresses to
`frontend/src/lib/deployment.json` automatically.

Copy the 3 contract addresses into your `.env` file as well (for reference).

### 5. Run the frontend

```bash
cd frontend
npm run dev
```

Open http://localhost:3000

---

## Using FundMatch

### Screen 1 — Founder
1. Connect MetaMask (Base Sepolia network)
2. Enter your real metrics (ARR, growth, runway, industry, stage)
3. Click "Encrypt & Submit Profile"
4. Your numbers are encrypted before leaving your browser

### Screen 2 — Investor
1. Connect MetaMask
2. Set your minimum thresholds
3. Click "Encrypt & Submit Criteria"

### Screen 3 — Match Engine
1. Enter both wallet addresses (investor + founder)
2. Click "Compute Match" — this triggers the on-chain FHE computation
3. View results: met / not met per criterion + overall score
4. Tap "Demo" to preview the UI without a wallet

---

## Project structure

```
fundmatch/
├── contracts/
│   ├── FounderRegistry.sol    # Stores encrypted founder metrics
│   ├── InvestorRegistry.sol   # Stores encrypted investor criteria
│   └── MatchEngine.sol        # FHE matching logic (FHE.gte, FHE.select)
├── scripts/
│   └── deploy.js              # Deploys all 3 contracts
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── layout.js      # Wagmi + QueryClient providers
│       │   ├── page.js        # Tab navigation + wallet connect
│       │   └── globals.css
│       ├── components/
│       │   ├── FounderScreen.js   # Screen 1
│       │   ├── InvestorScreen.js  # Screen 2
│       │   └── MatchScreen.js     # Screen 3
│       └── lib/
│           ├── contracts.js   # ABIs + addresses
│           ├── wagmi.js       # Chain + connector config
│           └── deployment.json  # Auto-generated after deploy
├── hardhat.config.js
├── .env.example
└── README.md
```

---

## Next steps after MVP

| Feature | What it involves |
|---|---|
| Real CoFHE encryption | Wire `@cofhe/sdk` `encrypt()` into form submission |
| Permit-gated decryption | Use `decryptForView()` with EIP-712 signed permits |
| Investor discovery | Let founders browse matched investors (without seeing criteria) |
| Match notifications | Event listener on `MatchComputed` → email/push alert |
| Mainnet deployment | Swap Base Sepolia → Base Mainnet in hardhat config |
| Token-gated access | Require holding a FundMatch NFT to register |

---

## Key CoFHE concepts used

- `FHE.asEuint32()` — converts encrypted input to a handle
- `FHE.gte()` — encrypted comparison (≥), returns `ebool`
- `FHE.select()` — constant-time encrypted conditional (no if/else)
- `FHE.add()` — encrypted addition for score accumulation
- `FHE.allowThis()` — grants the contract permission to hold the ciphertext
- `FHE.allow()` — grants a specific address permission to decrypt

---

## Resources

- CoFHE docs: https://cofhe-docs.fhenix.zone
- Base Sepolia faucet: https://faucet.quicknode.com/base/sepolia
- Basescan (testnet): https://sepolia.basescan.org
- CoFHE GitHub: https://github.com/FhenixProtocol/cofhesdk
