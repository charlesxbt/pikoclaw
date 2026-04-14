---
name: Vision Extract
description: Object detection, OCR, layout parsing, and structured data extraction from images and PDFs. Returns clean JSON with bounding boxes.
version: 1.3.0
price: 0.08

x402:
  enabled: true
  network: base
  asset: USDC
  wallet: "0xYourWalletAddress"
  endpoint: "https://api.pikoclaw.sh/skills/vision"

paypal_email: "skills@pikoclaw.sh"

tags:
  - vision
  - ocr
  - multimodal
  - pdf
  - document
---

# Vision Extract

Multimodal data extraction skill for AI agents. Feed it an image or PDF, get back clean structured JSON. Handles scanned documents, receipts, invoices, screenshots, charts, and more.

## What it does

- **OCR** — extract all text from images and scanned PDFs
- **Layout parsing** — understand tables, columns, headers, paragraphs
- **Object detection** — identify and locate objects with bounding boxes
- **Document extraction** — pull structured fields from invoices, receipts, forms
- **Chart reading** — extract data points from bar charts, line graphs, pie charts
- **Handwriting** — basic handwritten text recognition

## Input

```json
{
  "source": "https://example.com/invoice.pdf",
  "mode": "document",
  "extract_fields": ["invoice_number", "date", "total", "line_items"],
  "output_format": "json"
}
```

Or base64:

```json
{
  "source": "data:image/png;base64,iVBORw0KGgo...",
  "mode": "ocr"
}
```

## Modes

| Mode | Use case |
|------|----------|
| `ocr` | Extract all text |
| `document` | Structured fields from forms/invoices |
| `table` | Extract tables as arrays |
| `objects` | Object detection with bounding boxes |
| `chart` | Data extraction from charts |

## Output — Document Mode

```json
{
  "mode": "document",
  "fields": {
    "invoice_number": "INV-2025-0091",
    "date": "2025-11-15",
    "vendor": "Acme Corp",
    "total": 1250.00,
    "line_items": [
      { "description": "Consulting services", "quantity": 5, "unit_price": 250.00, "total": 1250.00 }
    ]
  },
  "confidence": 0.97,
  "pages": 1
}
```

## Supported Formats

Images: PNG, JPG, WEBP, GIF (first frame), TIFF
Documents: PDF (up to 50 pages)

## Limits

- Max 10MB per file
- Max 50 pages per PDF
- Base64 input: max 5MB
