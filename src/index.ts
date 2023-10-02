import express, { type Application, type Request, type Response, type NextFunction } from 'express'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import userRoute from './routes/Users.route'
import projectRoute from './routes/Projects.router'
import taskRoute from './routes/Task.route'
import { htmlResponse } from './helpers/htmlResponse'
dotenv.config()

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Taskpad API',
      version: '1.0.0'
    }
  },
  apis: ['./src/docs/*.ts']
}

const app: Application = express()
const PORT: string = process.env.PORT ?? '5000'

app.use(fileUpload())
app.use(express.static('./public'))
app.use(cors())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())
app.use(cookieParser())
const specs = swaggerJSDoc(options)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))

app.get('/', (req, res) => {
  // Redirect to the welcome page
  res.redirect('/wellcome')
})

app.use('/wellcome', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send(htmlResponse)
})

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: '200' })
})

app.use(userRoute)
app.use(projectRoute)
app.use(taskRoute)

app.listen(PORT, () => {
  console.log(`Server Up And Running At http://localhost:${PORT}`)
})
