import express from 'express'
import { paymentMiddleware } from 'x402-express'
import { facilitator } from 'x402/facilitators'

const app = express()
app.use(express.json())

const WALLET = process.env.WALLET_ADDRESS || '0xYourWalletAddress'

// x402 payment middleware — protects all skill routes
app.use(paymentMiddleware(
  WALLET,
  {
    'GET /skills/browse-agent':  { price: '$0.04', network: 'base' },
    'GET /skills/code-review':   { price: '$0.10', network: 'base' },
    'GET /skills/nl2sql':        { price: '$0.03', network: 'base' },
    'GET /skills/vision':        { price: '$0.08', network: 'base' },
    'GET /skills/data-clean':    { price: '$0.05', network: 'base' },
    'GET /skills/email-draft':   { price: '$0.02', network: 'base' },
    'GET /skills/git-ops':       { price: '$0.07', network: 'base' },
    // Free skills — no payment required
    // 'GET /skills/mem-store'
    // 'GET /skills/api-chain'
  },
  { facilitator: facilitator('base') }
))

app.get('/skills/:id', (req, res) => {
  res.json({ skill: req.params.id, access: 'granted', timestamp: Date.now() })
})

app.get('/catalog', (_req, res) => {
  res.json({ skills: ['browse-agent','code-review','mem-store','nl2sql','vision','api-chain','data-clean','email-draft','git-ops'] })
})

app.listen(3000, () => console.log('PikoClaw API running on :3000'))
