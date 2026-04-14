<div align="center">
  <img src="./website/assets/logo.svg" alt="PikoClaw" width="320" />
</div>

> **AI Agent Skills Marketplace** — buy & sell autonomous AI capabilities, powered by [x402](https://x402.org) payments on Base.

[![x402](https://img.shields.io/badge/payments-x402-3b82f6?style=flat-square)](https://x402.org)
[![Base](https://img.shields.io/badge/network-Base%20L2-0052ff?style=flat-square)](https://base.org)
[![USDC](https://img.shields.io/badge/asset-USDC-2775ca?style=flat-square)](https://circle.com/usdc)
[![License: MIT](https://img.shields.io/badge/license-MIT-c8ff00?style=flat-square)](LICENSE)

**[→ Live Site](https://23998f7b.mogra.site)** · **[→ Browse Skills](#skills)** · **[→ Sell a Skill](#sell-a-skill)**

---

## What is PikoClaw?

PikoClaw is a GitHub-native marketplace for AI agent skills. Every skill is a GitHub repo with a `SKILL.md` frontmatter — your repo is your storefront, your `SKILL.md` is your listing, and your wallet address is your payment destination.

AI agents can **autonomously discover, pay for, and use skills** without any human checkout — via the [x402 protocol](https://x402.org) (HTTP 402 Payment Required + USDC on Base).

```
Agent → GET /skills/browse-agent
Server ← HTTP 402 (price: $0.04 USDC)
Agent → pays 0.04 USDC on Base (EIP-3009)
Server ← HTTP 200 (skill delivered)
```

---

## Skills

| Skill | Description | Price | Payment |
|-------|-------------|-------|---------|
| [Browse Agent](./skills/browse-agent/) | Autonomous browser — navigate, fill forms, extract data | $0.04 | x402 |
| [Code Review](./skills/code-review/) | Security audit + style enforcement, returns JSON | $0.10 | x402 · PayPal |
| [Memory Store](./skills/mem-store/) | Persistent vector memory across agent sessions | FREE | — |
| [NL → SQL](./skills/nl2sql/) | Natural language to optimized SQL, schema-aware | $0.03 | x402 |
| [Vision Extract](./skills/vision/) | OCR, object detection, PDF parsing → structured JSON | $0.08 | x402 · PayPal |
| [API Chain](./skills/api-chain/) | Multi-step API workflow orchestration | FREE | — |
| [Data Cleaner](./skills/data-clean/) | Normalize, deduplicate, validate datasets | $0.05 | x402 |
| [Email Draft](./skills/email-draft/) | Professional email generation, multilingual | $0.02 | x402 · PayPal |
| [Git Ops](./skills/git-ops/) | Read repos, write code, open PRs via GitHub API | $0.07 | x402 |

---

## How x402 Works

PikoClaw uses the [x402 protocol](https://x402.org) — an open standard by Coinbase that revives HTTP's `402 Payment Required` status code for machine-native payments.

```
┌─────────────┐    GET /skill     ┌─────────────┐
│  AI Agent   │ ──────────────→  │   Server    │
│             │ ←── HTTP 402 ──  │  (PikoClaw) │
│             │  {amount, network,│             │
│             │   asset, payTo}  │             │
│             │                  └─────────────┘
│             │  sign EIP-3009        ▲
│             │ ──── USDC TX ───→ Base L2
│             │ ──── retry ──────────→
│             │ ←── HTTP 200 ─────────
└─────────────┘    {skill data}
```

**No login. No API keys. No checkout flow. Agents pay in milliseconds.**

---

## Sell a Skill

Turn any GitHub repo into a paid AI skill in 4 steps:

### 1. Create a GitHub Org
Your org becomes your storefront identity.

### 2. Install the PikoClaw GitHub App
Grant read access to your skill repos. PikoClaw auto-discovers every `SKILL.md`.

### 3. Add `SKILL.md` to your repo

```yaml
---
name: My Skill
description: What it does for agents
version: 1.0.0
price: 0.05

# x402 — agent-native payment
x402:
  enabled: true
  network: base
  asset: USDC
  wallet: "0xYourWalletAddress"
  endpoint: "https://api.yourskill.com/run"

# fallback for human buyers
paypal_email: "you@example.com"

tags:
  - your
  - tags
---

# Full documentation here.
# This is what agents read to understand how to use your skill.
```

### 4. Your skill is live
- AI agents pay via x402 (USDC on Base, milliseconds, no human needed)
- Humans pay via PayPal
- Revenue goes **directly to your wallet** — no middleman

---

## For Buyers (AI Agents)

Send your agent to PikoClaw to discover and autonomously purchase skills:

```bash
# Discover available skills
curl https://api.pikoclaw.sh/catalog

# Agent reads skill documentation
curl https://api.pikoclaw.sh/skills/browse-agent

# Server returns 402 with payment details
# Agent auto-pays via x402 → gets access
```

Or point your agent to the agent manifest:

```bash
curl pikoclaw.sh/agent.md
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Payments | [x402](https://x402.org) — HTTP 402 + USDC on Base |
| Network | [Base L2](https://base.org) — Coinbase L2, ~$0.001 gas |
| Asset | [USDC](https://circle.com/usdc) — ERC-20 stablecoin |
| Source | GitHub — repos as products, `SKILL.md` as listings |
| Auth | EIP-3009 transferWithAuthorization |
| Middleware | [x402-express](https://www.npmjs.com/package/x402-express) |

---

## Project Structure

```
pikoclaw/
├── skills/               # Individual skill packages
│   ├── browse-agent/     # SKILL.md + implementation
│   ├── code-review/
│   ├── mem-store/
│   └── ...
├── website/              # Marketing site source
├── docs/                 # Protocol documentation
│   ├── x402.md
│   └── skill-spec.md
├── server/               # x402 payment middleware
└── .github/              # Issue templates, workflows
```

---

## Contributing

PRs welcome! To add a new skill:

1. Fork this repo
2. Create `skills/your-skill-name/SKILL.md`
3. Follow the [SKILL.md spec](./docs/skill-spec.md)
4. Submit a PR

---

## License

MIT © [PikoClaw](https://pikoclaw.sh)

---

<div align="center">
  <strong>AGENT-NATIVE · x402 · BASE · GITHUB</strong><br>
  <a href="https://23998f7b.mogra.site">pikoclaw.sh</a>
</div>
