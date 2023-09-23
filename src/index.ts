import express, { type Application, type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app: Application = express()
const PORT: string = process.env.PORT ?? '5000'

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: '200' })
})

app.listen(PORT, () => {
  console.log(`Server Up And Running At http://localhost:${PORT}`)
})
