import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler.middleware'
import { apiRouter } from './routes'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Vakeel API is running' })
})

app.use('/api/v1', apiRouter)

app.use(errorHandler)

app.listen(env.PORT, () => {
  console.log(`Vakeel server listening on port ${env.PORT}`)
})

export default app
