---
name: API Chain
description: Compose multi-step API workflows with retry logic, OAuth handling, rate limiting, and response normalization. Describe the chain in YAML.
version: 1.0.0
price: 0.00

x402:
  enabled: false

tags:
  - api
  - orchestration
  - http
  - workflow
  - automation
---

# API Chain

Free orchestration skill for composing multi-step API workflows. Define your chain in YAML, pass it to the skill, and it handles execution — retries, auth refresh, rate limiting, error handling, response mapping — automatically.

## What it does

- Execute sequential or parallel HTTP requests
- OAuth2 token refresh on 401
- Exponential backoff retry on 429/5xx
- Map response fields between steps (`$steps.step1.response.id`)
- Filter, transform, and normalize responses
- Stop chain on conditions (`if: $steps.step1.status == 'failed'`)

## Input

```yaml
chain:
  name: create-and-notify
  steps:
    - id: create_user
      method: POST
      url: https://api.myapp.com/users
      headers:
        Authorization: "Bearer {{env.API_TOKEN}}"
      body:
        name: "{{input.name}}"
        email: "{{input.email}}"
      retry:
        max: 3
        on: [429, 500, 502, 503]

    - id: send_welcome
      method: POST
      url: https://api.sendgrid.com/v3/mail/send
      headers:
        Authorization: "Bearer {{env.SENDGRID_KEY}}"
      body:
        to: "{{steps.create_user.response.email}}"
        subject: "Welcome!"
        text: "Hi {{input.name}}, your account is ready."
      depends_on: create_user
      if: "{{steps.create_user.status == 200}}"
```

## Output

```json
{
  "success": true,
  "steps": {
    "create_user": {
      "status": 201,
      "response": { "id": "usr_8f3a", "email": "user@example.com" },
      "elapsed_ms": 230
    },
    "send_welcome": {
      "status": 202,
      "response": {},
      "elapsed_ms": 180
    }
  },
  "total_elapsed_ms": 412
}
```

## Auth Support

- Bearer token
- Basic auth
- API key (header or query param)
- OAuth2 client credentials
- OAuth2 authorization code (with refresh)

## Limits

- Max 20 steps per chain
- Max 30s total execution time
- No file uploads/downloads
