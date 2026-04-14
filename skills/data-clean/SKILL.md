---
name: Data Cleaner
description: Normalize, deduplicate, and validate datasets. Infer schema, fix types, fill nulls. Works with CSV, JSON, Parquet inputs.
version: 1.2.0
price: 0.05

x402:
  enabled: true
  network: base
  asset: USDC
  wallet: "0xYourWalletAddress"
  endpoint: "https://api.pikoclaw.sh/skills/data-clean"

tags:
  - data
  - etl
  - csv
  - cleaning
  - normalization
---

# Data Cleaner

Data preparation skill for AI agents. Feed in dirty data, get back clean, consistent, validated datasets ready for analysis or ingestion.

## What it does

- **Type inference** — detect and fix incorrect types (e.g. "123" → 123)
- **Null handling** — fill, drop, or flag null values by strategy
- **Deduplication** — exact and fuzzy duplicate removal
- **Normalization** — standardize date formats, phone numbers, addresses, currencies
- **Validation** — apply rules and flag rows that fail
- **Schema inference** — auto-generate JSON Schema from data

## Input

```json
{
  "data": "name,age,email,signup_date\nAlice,\"twenty-five\",alice@example.com,2025/01/15\nBob,30,,01-16-2025\nBob,30,,01-16-2025",
  "format": "csv",
  "operations": ["fix_types", "fill_nulls", "deduplicate", "normalize_dates"],
  "null_strategy": "fill_mean",
  "date_format_out": "ISO8601",
  "deduplicate_key": ["name", "age"]
}
```

Or a URL:

```json
{
  "url": "https://example.com/data/users.csv",
  "format": "csv",
  "operations": ["fix_types", "deduplicate"]
}
```

## Output

```json
{
  "rows_in": 3,
  "rows_out": 2,
  "rows_dropped": 1,
  "changes": [
    { "row": 0, "col": "age", "before": "twenty-five", "after": null, "action": "type_error_nulled" },
    { "row": 1, "col": "email", "before": null, "after": null, "action": "null_kept_no_fill" },
    { "row": 2, "col": "signup_date", "before": "01-16-2025", "after": "2025-01-16", "action": "date_normalized" },
    { "row": 2, "action": "duplicate_dropped" }
  ],
  "data": "name,age,email,signup_date\nAlice,,alice@example.com,2025-01-15\nBob,30,,2025-01-16",
  "schema": {
    "name": "string",
    "age": "integer",
    "email": "string",
    "signup_date": "date"
  }
}
```

## Supported Formats

Input: CSV, JSON, JSONL, Parquet, TSV
Output: CSV, JSON, JSONL (matches input format by default)

## Null Strategies

- `drop_row` — remove rows with nulls
- `fill_mean` — fill numeric nulls with column mean
- `fill_mode` — fill with most common value
- `fill_empty` — fill strings with ""
- `keep` — keep nulls as-is (default)

## Limits

- Max 100MB per file
- Max 1M rows per call
