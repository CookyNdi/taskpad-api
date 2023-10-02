import { PrismaClient } from '@prisma/client'
import { type Request, type Response, type NextFunction } from 'express'

const prisma = new PrismaClient()
interface CustomRequest extends Request {
  userId: string
  projectId: string
  taskId: string
}

export const getTaskById = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: req.taskId
      }
    })
    res.status(200).json({ task })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const createTask = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {
      projectId,
      title,
      statusId
    }: {
      projectId: string
      title: string
      statusId: string
    } = req.body
    await prisma.task.create({
      data: {
        project_id: projectId,
        status_id: Number(statusId),
        title
      }
    })
    res.status(200).json({ msg: 'Task created successfully' })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const updateTaskTitle = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { title }: { title: string } = req.body
    await prisma.task.update({
      where: { id: req.taskId },
      data: { title }
    })
    return res.status(200).json({ msg: 'Task updated successfully' })
  } catch (error: any) {
    return res.status(500).json({ msg: error.message })
  }
}

export const updateTaskStatus = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { status }: { status: string } = req.body
    await prisma.task.update({
      where: { id: req.taskId },
      data: { status_id: Number(status) }
    })
    return res.status(200).json({ msg: 'Task updated successfully' })
  } catch (error: any) {
    return res.status(500).json({ msg: error.message })
  }
}

export const deleteTask = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    await prisma.task.delete({
      where: {
        id: req.taskId
      }
    })
    res.status(200).json({ msg: 'Task deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}
