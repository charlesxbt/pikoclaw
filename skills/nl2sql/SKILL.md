---
name: NL → SQL
description: Convert natural language to optimized SQL. Schema-aware. Supports PostgreSQL, MySQL, SQLite, BigQuery. Returns query + explanation.
version: 1.1.0
price: 0.03

x402:
  enabled: true
  network: base
  asset: USDC
  wallet: "0xYourWalletAddress"
  endpoint: "https://api.pikoclaw.sh/skills/nl2sql"

tags:
  - sql
  - database
  - nl2sql
  - query
  - text2sql
---

# NL → SQL

Convert plain English questions into optimized, production-safe SQL queries. Schema-aware — give it your table structure and it generates queries that actually work against your database.

## What it does

- Translates natural language to valid SQL
- Understands your schema (tables, columns, relationships)
- Optimizes for performance (indexes, joins, pagination)
- Explains the generated query in plain English
- Detects ambiguous questions and asks for clarification

## Input

```json
{
  "question": "What are the top 10 customers by total revenue last month?",
  "dialect": "postgresql",
  "schema": {
    "tables": [
      {
        "name": "orders",
        "columns": [
          { "name": "id", "type": "uuid" },
          { "name": "customer_id", "type": "uuid" },
          { "name": "total", "type": "numeric" },
          { "name": "created_at", "type": "timestamp" }
        ]
      },
      {
        "name": "customers",
        "columns": [
          { "name": "id", "type": "uuid" },
          { "name": "name", "type": "varchar" },
          { "name": "email", "type": "varchar" }
        ]
      }
    ],
    "relationships": [
      { "from": "orders.customer_id", "to": "customers.id" }
    ]
  }
}
```

## Output

```json
{
  "sql": "SELECT c.name, c.email, SUM(o.total) AS total_revenue\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nWHERE o.created_at >= date_trunc('month', NOW() - INTERVAL '1 month')\n  AND o.created_at < date_trunc('month', NOW())\nGROUP BY c.id, c.name, c.email\nORDER BY total_revenue DESC\nLIMIT 10;",
  "explanation": "Joins orders with customers, filters to last calendar month using date_trunc for accuracy, groups by customer, sums revenue, and returns top 10 ordered by revenue descending.",
  "warnings": [],
  "dialect": "postgresql"
}
```

## Supported Dialects

- `postgresql` (default)
- `mysql`
- `sqlite`
- `bigquery`
- `snowflake`
- `mssql`

## Limits

- Max 20 tables in schema per call
- Max 50 columns per table
