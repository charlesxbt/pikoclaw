---
name: Code Review
description: Security analysis, performance audit, and style enforcement. Returns structured JSON with severity levels and line-level fix suggestions.
version: 2.0.1
price: 0.10

x402:
  enabled: true
  network: base
  asset: USDC
  wallet: "0xYourWalletAddress"
  endpoint: "https://api.pikoclaw.sh/skills/code-review"

paypal_email: "skills@pikoclaw.sh"

tags:
  - security
  - refactor
  - code
  - audit
  - lint
---

# Code Review

Deep static analysis skill for AI agents. Analyzes code for security vulnerabilities, performance issues, and style violations. Returns structured JSON with actionable fix suggestions at the line level.

## What it does

- **Security** — SQL injection, XSS, CSRF, hardcoded secrets, insecure deps
- **Performance** — N+1 queries, unnecessary re-renders, memory leaks
- **Style** — naming conventions, dead code, complexity metrics
- **Deps** — outdated packages with known CVEs

## Input

```json
{
  "code": "function login(user, pass) { ... }",
  "language": "javascript",
  "checks": ["security", "performance", "style"],
  "severity_threshold": "medium"
}
```

Or pass a GitHub URL:

```json
{
  "github_url": "https://github.com/org/repo/blob/main/src/auth.js",
  "checks": ["security"]
}
```

## Output

```json
{
  "summary": {
    "total": 4,
    "critical": 1,
    "high": 1,
    "medium": 2,
    "low": 0
  },
  "issues": [
    {
      "id": "SEC-001",
      "severity": "critical",
      "line": 12,
      "column": 5,
      "rule": "sql-injection",
      "message": "User input concatenated into SQL query",
      "fix": "Use parameterized queries: db.query('SELECT * FROM users WHERE id = ?', [userId])",
      "cwe": "CWE-89"
    }
  ]
}
```

## Supported Languages

JavaScript, TypeScript, Python, Go, Rust, Java, PHP, Ruby, C, C++

## Limits

- Max 10,000 lines per call
- Max 5 files per call
- GitHub URL requires public repo or token in headers
