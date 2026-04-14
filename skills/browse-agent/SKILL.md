---
name: Browse Agent
description: Autonomous browser for AI agents — navigate pages, fill forms, click buttons, extract structured data. No human needed.
version: 1.2.0
price: 0.04

x402:
  enabled: true
  network: base
  asset: USDC
  wallet: "0xYourWalletAddress"
  endpoint: "https://api.pikoclaw.sh/skills/browse-agent"

paypal_email: "skills@pikoclaw.sh"

tags:
  - browser
  - playwright
  - scraping
  - automation
  - web
---

# Browse Agent

Autonomous browser skill powered by Playwright. Lets AI agents navigate the web without human intervention.

## What it does

- Navigate to any URL
- Click buttons, links, and interactive elements
- Fill and submit forms
- Extract structured data from pages
- Take screenshots
- Handle dynamic JavaScript-rendered content
- Anti-detection (stealth mode)

## Input

```json
{
  "url": "https://example.com",
  "actions": [
    { "type": "click", "selector": "#login-btn" },
    { "type": "fill", "selector": "#email", "value": "agent@example.com" },
    { "type": "extract", "selector": ".product-list", "format": "json" }
  ],
  "screenshot": false
}
```

## Output

```json
{
  "success": true,
  "data": { ... },
  "screenshot_url": null,
  "elapsed_ms": 1240
}
```

## Usage via x402

```bash
# First request — returns 402
curl https://api.pikoclaw.sh/skills/browse-agent \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "actions": [...]}'

# HTTP 402 Payment Required
# { "scheme": "exact", "network": "base", "amount": "40000", "asset": "USDC", "payTo": "0xpiko..." }

# Pay with x402 client, then retry with X-Payment header
curl https://api.pikoclaw.sh/skills/browse-agent \
  -H "X-Payment: <signed-payment-header>" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "actions": [...]}'

# HTTP 200 OK — skill response delivered
```

## Supported Browsers

- Chromium (default)
- Firefox
- WebKit

## Limits

- Max 30 actions per call
- Max 60s execution time
- No file downloads
