---
name: Email Draft
description: Generate professional, context-aware emails. Cold outreach, follow-ups, investor updates, customer replies. Tone-adaptive. Multilingual.
version: 1.0.0
price: 0.02

x402:
  enabled: true
  network: base
  asset: USDC
  wallet: "0xYourWalletAddress"
  endpoint: "https://api.pikoclaw.sh/skills/email-draft"

paypal_email: "skills@pikoclaw.sh"

tags:
  - email
  - copywriting
  - outreach
  - nlp
---

# Email Draft

Professional email generation for AI agents. Produces context-aware, tone-matched emails for any business scenario. Multilingual. Returns subject + body.

## Input
```json
{
  "type": "cold_outreach",
  "sender": { "name": "Alex", "company": "MyStartup", "role": "CEO" },
  "recipient": { "name": "Sarah", "company": "BigCorp", "role": "Head of Engineering" },
  "goal": "Schedule a 20-min demo of our API monitoring tool",
  "tone": "professional",
  "language": "en",
  "max_words": 120
}
```

## Output
```json
{
  "subject": "Quick question about BigCorp's API reliability",
  "body": "Hi Sarah,\n\nI noticed BigCorp ships multiple public APIs...",
  "word_count": 98,
  "tone": "professional",
  "language": "en"
}
```

## Types
cold_outreach, follow_up, investor_update, customer_reply, internal_update, apology, proposal

## Languages
en, id, es, fr, de, pt, ja, zh (and 20+ more)
