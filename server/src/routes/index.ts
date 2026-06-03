import { Router } from 'express'

export const apiRouter = Router()

apiRouter.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Vakeel API v1',
    data: { version: '1.0.0' },
  })
})

// Route modules (auth, cases, hearings, ...) will be mounted here in Phase 1
