import { PrismaClient } from '@prisma/client'
import { type Request, type Response, type NextFunction } from 'express'

const prisma = new PrismaClient()
interface CustomRequest extends Request {
  userId: string
  projectId: string
  taskId: string
}

export const getTasks = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const tasks = await prisma.task.findMany({ where: { project_id: req.projectId } })
    res.status(200).json(tasks)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const getTaskById = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: req.taskId,
        project_id: req.projectId
      }
    })
    if (task == null) {
      res.status(404).json({ message: 'Task not found' })
    } else {
      res.status(200).json({ task })
    }
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const createTask = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {
      title,
      status
    }: {
      title: string
      status: string
    } = req.body
    await prisma.task.create({
      data: {
        project_id: req.projectId,
        title,
        status
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
    const task: null | { id: string } = await prisma.task.findUnique({ where: { id: req.taskId } })
    if (task == null) {
      return res.status(404).json({ msg: 'Task not found' })
    }
    await prisma.task.update({
      where: { id: task.id },
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
    const task: null | { id: string } = await prisma.task.findUnique({ where: { id: req.taskId } })
    if (task == null) {
      return res.status(404).json({ msg: 'Task not found' })
    }
    await prisma.task.update({
      where: { id: task.id },
      data: { status }
    })
    return res.status(200).json({ msg: 'Task updated successfully' })
  } catch (error: any) {
    return res.status(500).json({ msg: error.message })
  }
}

export const deleteTask = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const task = await prisma.task.delete({
      where: {
        id: req.taskId,
        project_id: req.projectId
      }
    })
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.status(200).json({ msg: 'Task deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}