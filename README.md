# Vakeel

**Court Case Management System**

Full-stack engineering blueprint v1.0 for a production-grade MERN court case management platform with Redis, Socket.io, Docker, AWS, CI/CD, enterprise security, auditability, and role-based workflows for courts, lawyers, litigants, and administrators.

> Vakeel means "lawyer" or "advocate" in Hindustani. The product is designed around a simple idea: every case, hearing, filing, order, document, and notice should move through one trusted system.

## Project Status

This repository currently contains the product and engineering blueprint. The target implementation is a layered MERN monolith designed to be split into services later without rewriting the domain model.

| Area | Status |
| --- | --- |
| Product blueprint | Complete |
| Architecture plan | Complete |
| Database model | Designed |
| API surface | Designed |
| Implementation scaffold | In progress (client + server monorepo) |
| Production deployment | Pending |

## Table of Contents

- [Vision](#vision)
- [Target Market](#target-market)
- [Roles and Permissions](#roles-and-permissions)
- [Architecture](#architecture)
- [Target Repository Structure](#target-repository-structure)
- [Domain Model](#domain-model)
- [REST API](#rest-api)
- [Authentication and Authorization](#authentication-and-authorization)
- [Core Workflows](#core-workflows)
- [Real-Time Events](#real-time-events)
- [Document Management](#document-management)
- [Audit and Compliance](#audit-and-compliance)
- [Infrastructure](#infrastructure)
- [Security](#security)
- [Testing Strategy](#testing-strategy)
- [Roadmap](#roadmap)
- [Resume Highlights](#resume-highlights)

## Vision

Courts across India and emerging legal markets often manage large caseloads through physical registers, disconnected systems, email, and informal messaging. Lawyers must physically visit registries for many filings. Litigants often have little visibility into their own case status. Court staff lack a unified, auditable operational layer.

Vakeel is designed as a multi-court, multi-jurisdiction case management system that supports the complete case lifecycle:

- Case filing and admission
- Party and advocate management
- Hearing scheduling and adjournments
- Motion filing and responses
- Judicial orders and e-signatures
- Evidence and document handling
- Fee calculation and payment records
- Audit trails and sealed-record enforcement
- Court analytics and workload reporting

## Target Market

- District courts, high courts, and tribunals
- Private arbitration and mediation centers
- Law firms managing large litigation portfolios
- Corporate legal departments tracking disputes
- Legal aid organizations managing public interest litigation

## Roles and Permissions

Vakeel uses a 9-role hierarchy with RBAC and ABAC. RBAC controls what a user can do. ABAC controls whether the user can do it for a specific court, jurisdiction, case, document, or sealed record.

| Level | Role | Scope | Key Capability |
| --- | --- | --- | --- |
| 1 | Litigant / Party | Own cases only | View status, receive notices, upload documents |
| 2 | Advocate / Lawyer | Assigned cases only | File cases, motions, documents, and responses |
| 3 | Court Clerk / Registrar | Assigned court | Accept filings, docket entries, hearings, fees |
| 4 | Public Prosecutor / DA | Criminal cases in jurisdiction | Access charge sheets, evidence, and plea workflows |
| 5 | Judge / Magistrate | Assigned caseload and court | Issue orders, set dates, access sealed records |
| 6 | Court Reporter | Assigned hearings | Upload transcripts and hearing records |
| 7 | Appellate Reviewer | Appeals only | Access lower court record and appellate observations |
| 8 | Court Administrator | Entire court or jurisdiction | Manage users, judge caseloads, analytics, court config |
| 9 | Super Admin | All jurisdictions and system | Configure courts, integrations, provisioning, billing |

### Permission Matrix

| Permission | Litigant | Advocate | Clerk | Prosecutor | Judge | Reporter | Appellate | Admin | Super Admin |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| View own case | Yes | Yes | Yes | Yes | Yes | No | Yes | Yes | Yes |
| File new case | No | Yes | Yes | No | No | No | No | No | Yes |
| File motion / petition | No | Yes | No | Yes | No | No | No | No | Yes |
| Docket entry | No | No | Yes | No | No | No | No | Yes | Yes |
| Issue court order | No | No | No | No | Yes | No | Yes | No | Yes |
| Access sealed records | No | No | No | No | Yes | No | Yes | Yes | Yes |
| Schedule hearings | No | No | Yes | No | Yes | No | No | Yes | Yes |
| Upload transcript | No | No | No | No | No | Yes | No | No | Yes |
| View all court data | No | No | No | No | No | No | No | Yes | Yes |
| System configuration | No | No | No | No | No | No | No | No | Yes |

## Architecture

Vakeel follows a layered monolith architecture. This keeps the first implementation cohesive and portfolio-friendly while preserving boundaries that can later become services.

```text
React SPA
   |
Nginx reverse proxy
   |
Express API + Socket.io
   |
Domain services
   |
MongoDB Atlas + Redis + S3
```

### Stack

| Layer | Technology |
| --- | --- |
| Client | React 18, TypeScript, Vite, Redux Toolkit, RTK Query, Tailwind CSS |
| API | Node.js, Express, TypeScript |
| Real-time | Socket.io |
| Jobs | Bull queues backed by Redis |
| Database | MongoDB Atlas with Mongoose |
| Cache / sessions | Redis |
| Files | AWS S3 with CloudFront |
| Infrastructure | Docker, Nginx, AWS ECS Fargate, ECR, CloudWatch |
| CI/CD | GitHub Actions |

## Target Repository Structure

```text
vakeel/
  client/
    src/
      app/
      assets/
      components/
        common/
        cases/
        hearings/
        documents/
        notifications/
      features/
        auth/
        cases/
        hearings/
        motions/
        orders/
        notifications/
      hooks/
      layouts/
      pages/
        litigant/
        advocate/
        clerk/
        judge/
        admin/
        superadmin/
      services/
      types/
      utils/
    public/
    Dockerfile
    package.json
  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      queues/
      socket/
      utils/
      app.ts
    Dockerfile
    package.json
  nginx/
    nginx.conf
  docker-compose.yml
  docker-compose.prod.yml
  .github/
    workflows/
```

## Domain Model

All schemas are designed for Mongoose and TypeScript. Every writeable domain entity should be audit-enabled through a shared plugin that records field-level diffs in an append-only audit collection.

### Core Collections

| Collection | Purpose |
| --- | --- |
| `User` | Authentication profile, role, court assignment, jurisdiction scope |
| `Court` | Court metadata, code, jurisdiction, configuration |
| `Jurisdiction` | Geographic or legal jurisdiction boundary |
| `Case` | Case number, type, status, court, judge, parties, sealing state |
| `Party` | Litigants, complainants, respondents, accused, intervenors |
| `Hearing` | Scheduled dates, courtroom, judge, attendees, transcript link |
| `Motion` | Applications, petitions, bail requests, responses, decisions |
| `Order` | Judicial orders, e-signature, appeal deadlines, compliance |
| `Document` | S3 object metadata, hashes, versions, access logs |
| `DocketEntry` | Case timeline entries and procedural history |
| `Fee` | Filing fees, receipts, waivers, payment metadata |
| `AuditLog` | Immutable field-level change history |
| `Notification` | In-app notification records |
| `ConflictRegistry` | Judge conflict-of-interest records |

### Case Number Format

```text
[CaseTypeCode]/[CourtCode]/[Year]/[Sequence]
```

Example:

```text
CS/DIST-DEL-01/2026/000347
```

Case numbers are generated through an atomic MongoDB counter keyed by case type, court code, and year.

## REST API

All API routes are versioned under:

```text
/api/v1
```

### Response Shape

```json
{
  "success": true,
  "data": {},
  "message": "Request completed",
  "meta": {}
}
```

Error shape:

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Out-of-scope access denied",
    "field": "caseId"
  }
}
```

### Endpoint Groups

| Group | Base Path | Examples |
| --- | --- | --- |
| Authentication | `/api/v1/auth` | Register, login, refresh, logout, MFA, password reset |
| Cases | `/api/v1/cases` | File case, list scoped cases, assign judge, seal case, appeal |
| Hearings | `/api/v1/hearings` | Schedule, adjourn, attendance, transcript, calendar |
| Motions | `/api/v1/motions` | File, respond, decide, withdraw |
| Orders | `/api/v1/orders` | Issue, sign, compliance, sealed checks |
| Documents | `/api/v1/documents` | Upload URL, confirm upload, download URL, versions |
| Fees | `/api/v1/fees` | Fee schedule, calculation, payment, webhook, receipts |
| Analytics | `/api/v1/analytics` | Court summary, velocity, workload, adjournments, trends |

### API Conventions

- Cursor pagination: `?cursor=<lastId>&limit=20`
- Authentication: `Authorization: Bearer <accessToken>`
- Refresh token: httpOnly, Secure, SameSite=Strict cookie
- Timestamps: ISO 8601 UTC
- Validation: Zod or Joi at the route boundary
- Controllers remain thin; business logic lives in services

## Authentication and Authorization

### JWT Strategy

Vakeel uses two tokens:

- Access token: 15 minutes, sent in the `Authorization` header
- Refresh token: 7 days, stored in an httpOnly cookie

Refresh tokens are stored in Redis as SHA-256 hashes so sessions can be revoked immediately.

```text
refresh:{sessionId} -> { userId, hash, expiresAt }
blacklist:{jti}     -> 1
```

### Access Token Claims

```json
{
  "sub": "userId",
  "role": "judge",
  "courtId": "court_xyz",
  "jurisdictionIds": ["jur_1", "jur_2"],
  "sessionId": "uuid",
  "iat": 0,
  "exp": 900
}
```

### Authorization Flow

1. Verify JWT and attach user context.
2. Check role permissions for `resource:action`.
3. Load the target resource if ABAC checks are needed.
4. Enforce court and jurisdiction scope.
5. Enforce party, advocate, judge, or admin relationship.
6. Enforce sealed-record restrictions.
7. Attach loaded domain record for downstream services.

## Core Workflows

### Case Filing

1. Advocate or clerk submits case details.
2. API validates court, parties, case type, and required documents.
3. Case number is generated atomically.
4. Case is created as `pending_admission`.
5. Filing fee is calculated.
6. Notifications are sent to clerk queue and parties.

### Judge Assignment

1. Admin selects eligible judge.
2. Service loads the case and judge conflict registry.
3. Any party or advocate conflict blocks assignment.
4. If clear, the judge is assigned and notified.
5. Audit log records the assignment.

### Motion Lifecycle

1. Advocate or prosecutor files a motion.
2. Response deadline is computed automatically.
3. Opposing advocate receives notice.
4. Judge admits, hears, allows, dismisses, or records withdrawal.
5. Case timeline and notification streams update in real time.

### Order Signing

1. Judge creates order draft.
2. Judge confirms signing with TOTP.
3. Signature payload is hashed.
4. Signed PDF is generated and stored in S3.
5. Appeal deadline is calculated.
6. Parties are notified.

## Real-Time Events

Socket.io runs on the same Node.js process as the Express API. The socket handshake verifies JWT credentials before accepting a connection.

### Rooms

| Room | Purpose |
| --- | --- |
| `user:{userId}` | Direct notifications |
| `court:{courtId}` | Court-wide broadcasts |
| `role:{role}:{courtId}` | Role-specific court messages |
| `case:{caseId}` | Case timeline and hearing updates |

### Event Catalog

| Event | Trigger | Recipient |
| --- | --- | --- |
| `case:status_changed` | Case status changes | `case:{id}` |
| `hearing:scheduled` | Hearing is created | `case:{id}` |
| `hearing:adjourned` | Hearing is adjourned | `case:{id}` |
| `motion:filed` | New motion filed | `case:{id}` |
| `motion:decided` | Judge decides motion | `case:{id}` |
| `order:issued` | Judge issues order | `case:{id}` |
| `notification:new` | Notification created | `user:{id}` |
| `court:causeList` | Clerk publishes cause list | `court:{id}` |

## Document Management

Files are uploaded directly to S3 using pre-signed URLs. The Express API never proxies large file bodies.

### Upload Flow

1. Client requests upload URL from `/api/v1/documents/upload-url`.
2. Client uploads directly to S3 with `PUT`.
3. Client confirms upload through `/api/v1/documents/confirm-upload`.
4. Server verifies metadata and stores a `Document` record.
5. Downloads use short-lived pre-signed URLs.

### Security Controls

- S3 bucket is private.
- Download URLs expire after 15 minutes.
- Every download is appended to `Document.accessLog`.
- Sealed document access is checked before URL generation.
- SHA-256 hash is stored for integrity verification.
- S3 upload events can trigger Lambda-based ClamAV scanning.
- Document versions are retained through `previousVersion` references.

## Audit and Compliance

The audit system is append-only. Domain writes should generate audit entries automatically through a Mongoose plugin.

Audit events capture:

- Entity type
- Entity ID
- Action type
- Actor
- Timestamp
- IP address
- User agent
- Field-level changes
- Request metadata

The `AuditLog` collection must not expose update or delete operations through application code.

## Infrastructure

### Local Development

Target local stack:

```text
client  -> React/Vite dev server
server  -> Express/Socket.io API
mongo   -> MongoDB 7
redis   -> Redis 7
nginx   -> Optional reverse proxy
```

### Production Target

| Service | Purpose |
| --- | --- |
| ECS Fargate | Container hosting for API workers |
| ECR | Docker image registry |
| S3 | Private document storage |
| CloudFront | Static frontend and document delivery edge |
| MongoDB Atlas | Managed MongoDB cluster |
| ElastiCache Redis | Sessions, cache, queues |
| Route53 + ACM | DNS and TLS certificates |
| CloudWatch | Logs, metrics, alarms |
| SES / SendGrid | Transactional email |
| Twilio | SMS notices |
| Secrets Manager | Production secrets |
| WAF | Edge protection |

## Security

| Category | Control |
| --- | --- |
| Authentication | JWT access tokens, Redis-backed refresh tokens |
| MFA | Mandatory TOTP for judges, optional for others |
| Brute force protection | Redis login attempt counters and lockout |
| Authorization | RBAC plus court, jurisdiction, and party ABAC |
| Sealed records | Role-gated access at middleware and service layers |
| API hardening | Helmet, rate limiting, CORS allowlist |
| Input protection | Validation, NoSQL sanitization, strict Mongoose schemas |
| Files | Private S3, pre-signed URLs, hash checks, virus scanning |
| Transport | HTTPS, HSTS, TLS 1.2+ |
| Secrets | No production `.env`; use Secrets Manager |
| Audit | Immutable append-only logs |

## Testing Strategy

| Layer | Tooling | Goal |
| --- | --- | --- |
| Unit | Jest | Business logic, utilities, deadline rules, fee calculation |
| Integration | Jest, Supertest, mongodb-memory-server | API routes, auth, ABAC, database operations |
| E2E | Playwright or Cypress | Login, file case, schedule hearing, issue order, download document |

Critical test paths:

- Advocate can file a case.
- Litigant cannot file a case directly.
- Out-of-jurisdiction user cannot access a case.
- Unauthorized user cannot access sealed records.
- Judge conflict blocks assignment.
- Motion response deadline is calculated correctly.
- Order signing requires TOTP.
- Document download logs access.

## Roadmap

### Phase 1: Foundation

- Monorepo scaffold
- Docker setup
- TypeScript, ESLint, Prettier
- MongoDB schemas for users, courts, jurisdictions, cases, parties
- Auth, JWT refresh sessions, Redis session storage
- RBAC and ABAC middleware
- Basic case CRUD
- Case number generator

### Phase 2: Core Workflows

- Hearing scheduling and adjournments
- Cause list management
- Motion filing, responses, and decisions
- Order creation and signing flow
- S3 document upload and verification
- Fee calculation and Razorpay integration
- Limitation and appeal deadline computation

### Phase 3: Real-Time and Notifications

- Socket.io authentication and rooms
- Case, hearing, motion, and order events
- Bull queue workers
- Hearing reminders
- Deadline alerts
- Email, SMS, and in-app notification delivery

### Phase 4: Frontend Dashboards

- Auth pages
- Protected role-based routes
- Litigant dashboard
- Advocate workspace
- Clerk cause list and filing queues
- Judge caseload and order workflows
- Admin analytics dashboard
- Document viewer and upload UI

### Phase 5: Production Hardening

- Integration and E2E tests
- Nginx reverse proxy
- CI/CD workflow
- AWS deployment
- CloudWatch logging and alerts
- Security audit
- MongoDB index review
- Redis analytics caching

## Resume Highlights

After implementation, this project can support resume bullets such as:

- Built an enterprise court case management platform with 9 role types, multi-jurisdiction support, sealed-record enforcement, and real-time case updates.
- Designed RBAC plus ABAC authorization middleware that prevents cross-court and out-of-jurisdiction data access.
- Implemented Socket.io rooms scoped by user, court, role, and case for real-time hearing, motion, and order notifications.
- Engineered a pre-signed S3 upload flow with SHA-256 integrity verification, access-logged downloads, and document versioning.
- Built an immutable audit trail using Mongoose middleware to capture field-level diffs across case, hearing, order, document, and fee workflows.

## License

License to be decided.
