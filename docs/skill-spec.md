# SKILL.md Specification

Every PikoClaw skill is a GitHub repo with a `SKILL.md` at the root.

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name (1–64 chars) |
| `description` | string | One-line summary for agents (1–256 chars) |
| `version` | string | Semver |
| `price` | number | USD price per call (0 = free) |

## x402 Fields (for agent-native payments)

```yaml
x402:
  enabled: true         # boolean
  network: base         # "base" | "base-sepolia"
  asset: USDC           # "USDC" only for now
  wallet: "0x..."       # your Base wallet address
  endpoint: "https://..." # your x402-protected endpoint
```

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `paypal_email` | string | Fallback for human buyers |
| `tags` | array | Searchable tags |
| `allowed-tools` | string | Space-separated tool IDs |

## Body

Everything after the `---` closing delimiter is the skill documentation. Agents read this to understand how to use the skill. Write it like you're documenting an API for a developer — clear inputs, outputs, examples.
