---
name: Memory Store
description: Persistent vector memory across agent sessions. Store, search, and retrieve long-term context with semantic similarity. Supports any embedding model.
version: 1.5.0
price: 0.00

x402:
  enabled: false

tags:
  - memory
  - vector
  - embeddings
  - context
  - rag
---

# Memory Store

Free persistent memory skill for AI agents. Store and retrieve information across sessions using semantic vector search. No more losing context between runs.

## What it does

- **Store** — save any text, JSON, or structured data with automatic embedding
- **Search** — semantic similarity search across all stored memories
- **Retrieve** — fetch by ID, tag, or time range
- **Forget** — delete individual memories or full namespaces
- **Namespace** — isolate memory per agent, user, or project

## Input — Store

```json
{
  "action": "store",
  "namespace": "agent-session-xyz",
  "content": "User prefers Python over JavaScript for data tasks.",
  "metadata": {
    "source": "conversation",
    "tags": ["preference", "python"]
  }
}
```

## Input — Search

```json
{
  "action": "search",
  "namespace": "agent-session-xyz",
  "query": "what language does the user prefer?",
  "top_k": 5,
  "threshold": 0.75
}
```

## Output

```json
{
  "results": [
    {
      "id": "mem_8f3a2c",
      "content": "User prefers Python over JavaScript for data tasks.",
      "score": 0.94,
      "metadata": { "source": "conversation", "tags": ["preference", "python"] },
      "created_at": "2025-11-01T12:00:00Z"
    }
  ]
}
```

## Embedding Models Supported

- `text-embedding-3-small` (default, OpenAI)
- `text-embedding-3-large`
- `nomic-embed-text` (local, open-source)
- Custom via `embedding_model` field

## Storage

- 10,000 memories per namespace (free tier)
- Memories persist for 90 days (free tier)
- Upgrade via x402 for unlimited storage
