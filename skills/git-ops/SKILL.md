---
name: Git Ops
description: Agents that read repos, write code, open PRs, and review diffs. Full GitHub API coverage. Scoped access, auditable actions.
version: 1.1.0
price: 0.07

x402:
  enabled: true
  network: base
  asset: USDC
  wallet: "0xYourWalletAddress"
  endpoint: "https://api.pikoclaw.sh/skills/git-ops"

tags:
  - github
  - pr
  - ci
  - devops
  - git
---

# Git Ops

Full GitHub operations skill for AI agents. Read repos, write files, open PRs, review diffs, manage issues — all via scoped GitHub tokens with full audit trail.

## Input
```json
{
  "action": "open_pr",
  "repo": "org/repo",
  "token": "ghp_...",
  "branch": "fix/auth-bug",
  "base": "main",
  "title": "Fix: SQL injection in auth endpoint",
  "body": "Closes #42. Replaced string concat with parameterized query.",
  "files": [
    { "path": "src/auth.js", "content": "..." }
  ]
}
```

## Actions
read_file, write_file, open_pr, review_pr, list_issues, create_issue, close_issue, list_commits, create_branch

## Output
```json
{
  "success": true,
  "pr_url": "https://github.com/org/repo/pull/43",
  "pr_number": 43
}
```
