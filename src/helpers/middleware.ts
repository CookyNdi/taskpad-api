import { PrismaClient } from '@prisma/client'
import { type Request, type Response, type NextFunction } from 'express'
import { verifyAccessToken } from './jwtConfig'

const prisma = new PrismaClient()
interface CustomRequest extends Request {
  userId: string
  projectId: string
  taskId: string
}

export const authentication = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  const accessTokenBearer: string | null = req.header('Authorization') ?? null
  const accessToken = accessTokenBearer?.replace(/^Bearer /, '')
  if (accessToken == null) {
    return res.status(401).json({ msg: 'Please Login First!!' })
  }
  try {
    const payload = verifyAccessToken(accessToken)
    if (!payload.valid) {
      return res.status(400).json({ msg: payload.message })
    }
    const user = await prisma.users.findUnique({
      where: { id: payload.message },
      select: { id: true, email: true }
    })
    if (user == null) {
      return res.status(404).json({ msg: 'User Not Found' })
    }
    req.userId = user.id
    next()
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const projectAuthor = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  const accessTokenBearer: string | null = req.header('Authorization') ?? null
  const accessToken = accessTokenBearer?.replace(/^Bearer /, '')
  if (accessToken == null) {
    return res.status(401).json({ msg: 'Please Login First!!' })
  }
  const payload = verifyAccessToken(accessToken)
  if (!payload.valid) {
    return res.status(400).json({ msg: payload.message })
  }
  const projectSelected = req.params.id
  const project = await prisma.projects.findUnique({ where: { id: projectSelected } })
  if (project == null) {
    return res.status(404).json({ msg: 'Project Not Found' })
  }
  if (project.user_id === payload.message) {
    req.projectId = project.id
    next()
  } else {
    return res.status(401).json({ msg: 'Unauthorized' })
  }
}

export const taskAuthor = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  const accessTokenBearer: string | null = req.header('Authorization') ?? null
  const accessToken = accessTokenBearer?.replace(/^Bearer /, '')
  if (accessToken == null) {
    return res.status(401).json({ msg: 'Please Login First!!' })
  }
  const payload = verifyAccessToken(accessToken)
  if (!payload.valid) {
    return res.status(400).json({ msg: payload.message })
  }
  const project = await prisma.projects.findMany({ where: { user_id: payload.message } })
  const taskSelected = req.params.id
  const task = await prisma.task.findUnique({ where: { id: taskSelected } })
  if (task == null) {
    return res.status(404).json({ msg: 'Task Not Found' })
  }
  if (project.some((projectItem) => projectItem.id === task.project_id)) {
    req.taskId = task.id
    next()
  } else {
    return res.status(401).json({ msg: 'Unauthorized' })
  }
}
