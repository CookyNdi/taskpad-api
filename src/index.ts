import express, { type Application, type Request, type Response, type NextFunction } from 'express'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoute from './routes/Users.route'
import projectRoute from './routes/Projects.router'
dotenv.config()

const app: Application = express()
const PORT: string = process.env.PORT ?? '5000'

app.use(fileUpload())
app.use(express.static('./public'))

app.use(cookieParser())

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: '200' })
})

app.use(userRoute)
app.use(projectRoute)

app.listen(PORT, () => {
  console.log(`Server Up And Running At http://localhost:${PORT}`)
})
