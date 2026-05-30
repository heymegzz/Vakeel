<div align="center">

```
██╗  ██╗██╗   ██╗██╗   ██╗███████╗██████╗  █████╗      █████╗ ██╗
██║ ██╔╝██║   ██║██║   ██║██╔════╝██╔══██╗██╔══██╗    ██╔══██╗██║
█████╔╝ ██║   ██║██║   ██║█████╗  ██████╔╝███████║    ███████║██║
██╔═██╗ ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║    ██╔══██║██║
██║  ██╗╚██████╔╝ ╚████╔╝ ███████╗██║  ██║██║  ██║    ██║  ██║██║
╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝
```

**Upload a bank statement PDF. Understand your money in 30 seconds.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/Fastify-4-00B386?style=flat-square&logo=fastify)](https://fastify.dev)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Claude AI](https://img.shields.io/badge/Claude-Sonnet%204-CC785C?style=flat-square)](https://anthropic.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Live Demo](#) · [Architecture Doc](./KUVERA_AI_Blueprint.md) · [API Docs](#) · [Report a Bug](#)

</div>

---

## What Is KUVERA AI?

Most financial apps make you link your bank account, grant OAuth permissions, and trust a third party with your credentials. **KUVERA AI does none of that.**

You already have a bank statement PDF sitting in your email. KUVERA AI converts it into a complete picture of your financial life — structured analytics, AI-generated behavioral narratives, conversational querying, and forward-looking recommendations — in under 30 seconds.

The real product isn't the charts. It's the moment the AI tells you:

> *"You spent ₹6,200 on Zomato this month — mostly on Friday nights after 9 PM. That's ₹1,800 higher than last month and your single largest recurring spend category."*

That's the moment users screenshot and share. That's the product.

---

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Services](#running-services)
- [API Reference](#api-reference)
- [Parser System](#parser-system)
- [AI Pipeline](#ai-pipeline)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

---

## Features

### Core
- **Zero-friction upload** — drag & drop a PDF, no bank linking or OAuth
- **Multi-bank parser** — supports HDFC, SBI, ICICI, Axis, Kotak + generic fallback with OCR
- **AI narrative generation** — Claude-powered financial summaries in plain language
- **Behavioral insights** — pattern detection across time-of-day, day-of-week, merchant frequency
- **Conversational AI** — ask anything: *"Can I afford a trip next month?"* or *"Which subscriptions should I cancel?"*

### Analytics
- 25+ financial metrics computed per statement
- Spending heatmap (7×24 day/hour grid)
- Month-over-month category trend analysis
- Recurring payment & subscription detection
- Financial health score (composite 0–100)
- Cash flow forecasting (exponential smoothing)
- Anomaly detection (z-score per category)

### Product
- Real-time parser progress via WebSocket
- Streaming AI responses (SSE token-by-token)
- Full transaction CRUD (edit, split, merge, tag, note)
- Budget manager with live spend tracking and alerts
- Goal tracking with AI coaching messages
- Monthly AI-generated PDF reports
- CSV / XLSX export
- PWA support (add to home screen, offline cache)

---

## Architecture Overview

```
 Browser
    │
    ▼
CloudFront CDN ──────────── S3 (PDFs + Static)
    │
    ▼
Application Load Balancer
    │
    ├── Next.js 14 (Frontend)
    │     ├── TanStack Query  (server state)
    │     ├── Zustand         (UI state)
    │     ├── Socket.io       (real-time progress)
    │     └── SSE             (streaming AI)
    │
    └── Fastify API (Node.js)
          ├── Auth ──────────────── MongoDB
          ├── Upload ────────────── S3 + BullMQ
          ├── Transactions ──────── MongoDB
          ├── Analytics ─────────── MongoDB + Redis
          ├── Chat ──────────────── MongoDB + Qdrant
          └── WebSocket Server ──── Redis pub/sub
                    │
              BullMQ Workers
                    ├── PDF Parsing ── Python Parser Service
                    │                   ├── camelot   (HDFC, ICICI)
                    │                   ├── pdfplumber (SBI, Axis)
                    │                   └── pytesseract (OCR fallback)
                    │
                    └── AI Pipeline ── Python AI Service
                                        ├── Claude Haiku   (categorize)
                                        ├── Claude Sonnet  (insights)
                                        ├── OpenAI Embeddings
                                        └── Qdrant         (vector search)
```

> **Full architecture document:** [KUVERA_AI_Blueprint.md](./KUVERA_AI_Blueprint.md) — 8,000+ words covering every system in depth.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) | SSR, streaming, file-based routing |
| **Language** | TypeScript (strict) | Type safety across entire codebase |
| **Styling** | Tailwind CSS + CSS Variables | Rapid iteration + consistent theming |
| **Components** | Radix UI (unstyled primitives) | Accessible, full design control |
| **Server State** | TanStack Query v5 | Caching, optimistic updates |
| **Client State** | Zustand | Lightweight, TypeScript-first |
| **Charts** | Recharts + D3.js | React-native + custom visualizations |
| **Tables** | TanStack Table + Virtual | Virtualized, 10k+ rows at 60fps |
| **Animations** | Framer Motion | Declarative, production-grade |
| **API Server** | Fastify 4 | 2–3× faster than Express |
| **Database** | MongoDB Atlas | Document model, aggregation pipeline |
| **Cache** | Redis (Upstash) | Session, API cache, queue backend |
| **Queue** | BullMQ | Reliable async jobs, retry, DLQ |
| **Vector DB** | Qdrant Cloud | Semantic search with metadata filtering |
| **PDF (tables)** | camelot-py | Best structured table extraction |
| **PDF (text)** | pdfplumber | Precise coordinate-level text extraction |
| **OCR** | pytesseract + OpenCV | Scanned statement fallback |
| **LLM (insights)** | Claude Sonnet (Anthropic) | Best reasoning + streaming |
| **LLM (classify)** | Claude Haiku | Fast, cheap categorization at scale |
| **Embeddings** | OpenAI text-embedding-3-small | Cost-effective, high quality |
| **Real-time** | Socket.io + Redis adapter | Multi-instance WebSocket |
| **Email** | Resend | Modern API-first email delivery |
| **Monitoring** | Prometheus + Grafana + Sentry | Full observability |
| **CI/CD** | GitHub Actions | Automated test → build → deploy |
| **Infra** | AWS ECS Fargate + S3 + CloudFront | Serverless containers, global CDN |

---

## Project Structure

```
kuvera-ai/
│
├── apps/
│   ├── frontend/               # Next.js 14 app
│   │   ├── app/                # App Router pages
│   │   ├── components/         # atoms / molecules / organisms
│   │   ├── hooks/              # Custom React hooks
│   │   ├── stores/             # Zustand stores
│   │   ├── lib/                # API client, utils
│   │   └── types/              # Shared TypeScript types
│   │
│   ├── api/                    # Fastify backend
│   │   ├── src/
│   │   │   ├── domains/        # auth, upload, transactions, chat...
│   │   │   ├── infrastructure/ # DB, Redis, S3, queues, sockets
│   │   │   ├── middleware/     # auth, rate-limit, audit
│   │   │   └── workers/        # BullMQ worker processes
│   │   └── tests/
│   │
│   ├── parser/                 # Python PDF parsing service
│   │   ├── parsers/            # hdfc.py, sbi.py, icici.py, axis.py...
│   │   ├── ocr/                # OCR fallback pipeline
│   │   ├── normalization/      # Transaction normalization layer
│   │   └── enrichment/         # Merchant enrichment + merchant DB
│   │
│   └── ai/                     # Python AI service
│       ├── categorizer/        # Rule engine + LLM categorization
│       ├── insight_generator/  # Narrative insight generation
│       ├── analytics/          # Forecasting, anomaly detection
│       ├── rag/                # Embedding pipeline + semantic search
│       └── chat/               # Chat handler + tool calling
│
├── packages/
│   ├── shared-types/           # Types shared across services
│   └── config/                 # Shared ESLint, TSConfig, etc.
│
├── infrastructure/
│   ├── docker-compose.yml      # Local full-stack dev
│   ├── docker-compose.prod.yml
│   └── aws/                    # ECS task definitions, IAM policies
│
├── .github/
│   └── workflows/
│       ├── ci.yml              # Test + lint on every PR
│       └── deploy.yml          # Deploy to ECS on main merge
│
├── docs/
│   ├── architecture.png        # System architecture diagram
│   ├── db-schema.png           # MongoDB schema
│   └── parser-flow.png         # Parser pipeline diagram
│
├── KUVERA_AI_Blueprint.md      # Full technical PRD (8,000+ words)
└── README.md
```

---

## Getting Started

### Prerequisites

```bash
node >= 20.0.0
python >= 3.11
docker + docker-compose
```

You'll also need API keys for:
- [Anthropic](https://console.anthropic.com) (Claude)
- [OpenAI](https://platform.openai.com) (embeddings)
- [MongoDB Atlas](https://cloud.mongodb.com) (or local MongoDB)
- [Qdrant Cloud](https://cloud.qdrant.io) (or local Qdrant)
- AWS account (S3 bucket)

### Clone & Install

```bash
git clone https://github.com/yourusername/kuvera-ai.git
cd kuvera-ai

# Install all Node dependencies (monorepo)
npm install

# Install Python dependencies
cd apps/parser && pip install -r requirements.txt
cd ../ai && pip install -r requirements.txt
cd ../..
```

### Quick Start with Docker

The fastest way to run everything locally:

```bash
cp .env.example .env
# Fill in your API keys in .env

docker-compose up --build
```

Services will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:3001
- Parser service: http://localhost:8001
- AI service: http://localhost:8002
- Bull Board (queue monitor): http://localhost:3001/admin/queues
- Qdrant UI: http://localhost:6333/dashboard

---

## Environment Variables

```bash
# .env.example

# App
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:3001

# Auth
JWT_SECRET=your-256-bit-secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=30d

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Database
MONGODB_URI=mongodb+srv://...
REDIS_URL=redis://localhost:6379

# AWS
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET=kuvera-uploads
S3_REPORTS_BUCKET=kuvera-reports

# AI
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...

# Vector DB
QDRANT_URL=https://your-cluster.qdrant.io
QDRANT_API_KEY=

# Email
RESEND_API_KEY=re_...

# Services (internal, for Docker networking)
PARSER_SERVICE_URL=http://parser:8001
AI_SERVICE_URL=http://ai:8002

# Monitoring
SENTRY_DSN=
```

---

## Running Services

### Development (individual services)

```bash
# Terminal 1 — Frontend
cd apps/frontend
npm run dev
# → http://localhost:3000

# Terminal 2 — API server
cd apps/api
npm run dev
# → http://localhost:3001

# Terminal 3 — BullMQ workers
cd apps/api
npm run workers
# → Processes pdf-parsing, ai-insight, email queues

# Terminal 4 — Parser service (Python)
cd apps/parser
uvicorn app.main:app --reload --port 8001
# → http://localhost:8001

# Terminal 5 — AI service (Python)
cd apps/ai
uvicorn app.main:app --reload --port 8002
# → http://localhost:8002
```

### With Docker Compose

```bash
# Start all services
docker-compose up

# Rebuild after code changes
docker-compose up --build

# Run only infrastructure (DB, Redis, Qdrant)
docker-compose up mongodb redis qdrant

# View logs for a specific service
docker-compose logs -f api
docker-compose logs -f parser
```

---

## API Reference

Full OpenAPI docs available at `http://localhost:3001/api/docs` when running locally.

### Core Endpoints

```
Authentication
  POST  /api/v1/auth/register
  POST  /api/v1/auth/login
  POST  /api/v1/auth/google
  POST  /api/v1/auth/refresh
  GET   /api/v1/auth/me

Statements (Upload Flow)
  POST  /api/v1/statements/presign       Get S3 pre-signed upload URL
  POST  /api/v1/statements/confirm       Confirm upload, trigger parsing
  GET   /api/v1/statements               List all user statements
  GET   /api/v1/statements/:id           Get statement + summary
  DELETE /api/v1/statements/:id

Transactions
  GET   /api/v1/transactions             List with filters + pagination
  PATCH /api/v1/transactions/:id         Edit category, note, tags
  PATCH /api/v1/transactions/bulk        Bulk edit up to 200 transactions
  POST  /api/v1/transactions/:id/split   Split into sub-categories
  POST  /api/v1/transactions/merge       Merge multiple transactions
  GET   /api/v1/transactions/export      Download CSV or XLSX

Analytics
  GET   /api/v1/analytics/summary        Dashboard KPIs
  GET   /api/v1/analytics/categories     Category breakdown
  GET   /api/v1/analytics/trends         Month-over-month trends
  GET   /api/v1/analytics/heatmap        7×24 spending heatmap
  GET   /api/v1/analytics/health-score   Financial health score (0–100)
  GET   /api/v1/analytics/recurring      Recurring payment detection
  GET   /api/v1/analytics/forecast       Next month spend forecast

Chat
  POST  /api/v1/chat/conversations       Start a new conversation
  POST  /api/v1/chat/stream              Send message (SSE streaming response)
  GET   /api/v1/chat/conversations       List conversation history

Budgets & Goals
  POST  /api/v1/budgets                  Create budget
  GET   /api/v1/budgets/:id/status       Live spend vs budget
  POST  /api/v1/goals                    Create financial goal
  GET   /api/v1/goals/:id/progress       Goal progress + AI coaching
```

### Upload Flow

```
1. Client calls POST /statements/presign
   ← Returns: { uploadUrl, uploadId, fields }

2. Client uploads PDF directly to S3 using pre-signed URL
   (PDF never passes through the API server)

3. Client calls POST /statements/confirm with uploadId
   ← Returns: { statementId, status: 'queued' }

4. Backend enqueues parsing job in BullMQ

5. Parser worker processes PDF, emits progress via Redis pub/sub
   → WebSocket server forwards to client in real-time

6. On completion, AI worker generates insights
   → WebSocket emits 'insight:ready' event to client
```

---

## Parser System

The parser is the most technically complex subsystem, supporting 5 bank formats with automatic detection and OCR fallback.

### Supported Banks

| Bank | Method | Accuracy | Notes |
|---|---|---|---|
| HDFC | `camelot` (lattice tables) | 98%+ | Most consistent format |
| ICICI | `camelot` (stream tables) | 97%+ | Two statement formats |
| SBI | `pdfplumber` (line parsing) | 95%+ | Wrapped text, complex layout |
| Axis | `pdfplumber` | 96%+ | |
| Kotak | `pdfplumber` | 94%+ | |
| Generic | Text heuristics + OCR | 80–90% | Any PDF bank statement |

### Adding a New Bank Parser

```python
# apps/parser/parsers/mybank.py
from .base import BaseParser, ParseResult

class MyBankParser(BaseParser):
    async def parse(self, pdf_path: str) -> ParseResult:
        # 1. Extract raw data using camelot or pdfplumber
        # 2. Map columns to BaseParser's Transaction model
        # 3. Return ParseResult with confidence score
        ...

# Register in apps/parser/parsers/router.py
self.bank_parsers['MYBANK'] = MyBankParser()
```

### Testing a Parser

```bash
cd apps/parser
python -m pytest tests/parsers/test_mybank.py -v

# Run accuracy benchmark across all fixtures
python -m pytest tests/parser/test_suite.py --benchmark
```

---

## AI Pipeline

### Categorization (Claude Haiku)

Transactions are categorized in batches of 50. Known merchants (Zomato, Netflix, Uber, etc.) are matched via a deterministic rule engine first — the LLM is called only for ambiguous narrations. This reduces AI cost by ~60%.

```
Transaction narration
        │
        ▼
Rule Engine (50k+ merchant patterns)
        │
   ┌────┴─────┐
Match?         No match
   │                │
Category        LLM (Claude Haiku)
returned          batch of 50
```

### Insight Generation (Claude Sonnet)

After categorization, the analytics engine pre-computes all metrics. These structured results — not raw transactions — are injected into carefully engineered prompts. The LLM generates narrative from facts, not from raw data, which eliminates hallucination of transaction details.

```
Parsed Transactions
        ↓
Analytics Engine (Python, deterministic)
        ↓
Structured Metrics (spend totals, trends, anomalies, etc.)
        ↓
Prompt Engineering Layer (inject metrics into narrative prompts)
        ↓
Claude Sonnet → Stream insight text to frontend
```

### Conversational AI (RAG + Tool Calling)

The chat system uses a hybrid retrieval approach:

1. **Semantic search** (Qdrant) — finds relevant transactions by meaning, not just keyword
2. **Tool calling** — LLM requests precise data (totals, filtered lists, forecasts) via defined tools
3. **Pre-computed analytics context** — user's financial profile injected into every system prompt

```python
# Example tools available to the chat LLM:
# get_transactions(category, date_range, min_amount, max_amount)
# get_category_summary(category, period)
# semantic_search_transactions(query)
# run_affordability_check(amount)
# get_financial_health()
```

---

## Deployment

### AWS ECS Fargate (Production)

```bash
# Build and push all service images to ECR
./infrastructure/scripts/build-and-push.sh

# Deploy to ECS (handled automatically by GitHub Actions on merge to main)
# Manual deploy:
aws ecs update-service --cluster kuvera-prod --service kuvera-api --force-new-deployment
```

### GitHub Actions CI/CD

Every push to `main`:
1. Run unit tests + integration tests
2. Run Trivy security scan on Docker images
3. Build and push images to ECR
4. Deploy to ECS with zero-downtime rolling update
5. Notify Slack on success/failure

Pull requests:
- Run tests + lint + type-check
- Block merge if any check fails

### Infrastructure Costs (estimated)

| Scale | Monthly AWS Cost | Notes |
|---|---|---|
| MVP (0–1k users) | $300–500 | ECS Fargate + Atlas M10 + Upstash |
| Growth (1k–10k) | $2,000–4,000 | Scaled ECS + Atlas M30 + Elasticache |
| Scale (10k–100k) | $15,000–25,000 | EKS + Atlas M60 + read replicas |

---

## Roadmap

- [x] HDFC, SBI, ICICI, Axis parsers
- [x] AI categorization + insight generation
- [x] Conversational AI with tool calling
- [x] Real-time parser progress (WebSocket)
- [x] Streaming AI responses (SSE)
- [x] Budget manager + goal tracking
- [x] Financial health score
- [ ] Kotak, IndusInd, Yes Bank parsers
- [ ] Monthly AI-generated PDF report
- [ ] Voice financial assistant (Web Speech API)
- [ ] Receipt scanner (Claude Vision)
- [ ] Shared family finance spaces
- [ ] Tax estimation (Indian slabs)
- [ ] Mobile app (React Native)
- [ ] B2B parser API (white-label)

---

## Contributing

Contributions are welcome, especially:
- New bank parsers (see [Adding a New Bank Parser](#adding-a-new-bank-parser))
- Parser accuracy improvements + new test fixtures
- UI components + accessibility improvements
- Documentation and examples

```bash
# Fork → Clone → Branch
git checkout -b feat/yourbank-parser

# Make changes, add tests
# Parser fixtures go in: apps/parser/tests/fixtures/

# Run tests
npm run test              # All Node tests
cd apps/parser && pytest  # Parser tests

# Commit (Conventional Commits format)
git commit -m "feat(parser): add YesBank statement parser"

# Open a Pull Request
```

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting.

---

## Security

Financial data is sensitive. Key security measures in KUVERA AI:

- **PDFs never touch the API server** — browser uploads directly to S3 via pre-signed URL
- **Raw PDFs auto-deleted** — S3 lifecycle policy deletes uploaded PDFs after 24 hours
- **PII encrypted at rest** — account numbers and narrations encrypted with AES-256-GCM
- **Only last 4 digits** of account numbers are ever stored
- **JWT refresh token rotation** with family-based compromise detection
- **Rate limiting** on all endpoints, stricter on upload and auth
- **Full audit log** of all sensitive actions (append-only)

To report a security vulnerability, please email **security@kuvera.ai** — do not open a public issue.

---

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

<div align="center">

Built with care for the millions of Indians who download their bank statements and never read them.

**[⭐ Star this repo](https://github.com/yourusername/kuvera-ai)** if you find it useful.

</div>
