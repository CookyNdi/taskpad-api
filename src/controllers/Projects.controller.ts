import { PrismaClient } from '@prisma/client'
import { type Request, type Response, type NextFunction } from 'express'

const prisma = new PrismaClient()
interface CustomRequest extends Request {
  userId: string
  projectId: string
}

export const getProjects = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const projects = await prisma.projects.findMany({ where: { user_id: req.userId } })
    const categories = await prisma.project_Categories.findMany({ where: { project_id: req.projectId } })
    res.status(200).json({ project: projects, category: categories })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const getProjectById = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const project = await prisma.projects.findUnique({
      where: {
        user_id: req.userId,
        id: req.projectId
      }
    })
    if (project == null) {
      res.status(404).json({ message: 'Project not found' })
    } else {
      const categories = await prisma.project_Categories.findMany({ where: { project_id: req.projectId } })
      res.status(200).json({ project, category: categories })
    }
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const createProject = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {
      name,
      description,
      priority,
      deadline,
      status,
      categoryIds
    }: {
      name: string
      description: string
      priority: string
      deadline: string
      status: number
      categoryIds: number[]
    } = req.body
    const project = await prisma.projects.create({
      data: {
        user_id: req.userId,
        status_id: status,
        name,
        description,
        priority,
        deadline
      }
    })
    const projectCategories = categoryIds.map((categoryId) => ({
      project_id: project.id,
      category_id: categoryId
    }))

    await prisma.project_Categories.createMany({
      data: projectCategories
    })
    res.status(200).json({ msg: 'Project created successfully' })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const updateProjectName = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { name }: { name: string } = req.body
    const project: null | { id: string } = await prisma.projects.findUnique({ where: { id: req.projectId } })
    if (project == null) {
      return res.status(404).json({ msg: 'Project not found' })
    }
    await prisma.projects.update({
      where: { id: project.id },
      data: { name }
    })
    return res.status(200).json({ msg: 'Project updated successfully' })
  } catch (error: any) {
    return res.status(500).json({ msg: error.message })
  }
}

export const updateProjectDescription = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { description }: { description: string } = req.body
    const project: null | { id: string } = await prisma.projects.findUnique({ where: { id: req.projectId } })
    if (project == null) {
      return res.status(404).json({ msg: 'Project not found' })
    }
    await prisma.projects.update({
      where: { id: project.id },
      data: { description }
    })
    return res.status(200).json({ msg: 'Project updated successfully' })
  } catch (error: any) {
    return res.status(500).json({ msg: error.message })
  }
}

export const updateProjectPriority = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { priority }: { priority: string } = req.body
    const project: null | { id: string } = await prisma.projects.findUnique({ where: { id: req.projectId } })
    if (project == null) {
      return res.status(404).json({ msg: 'Project not found' })
    }
    await prisma.projects.update({
      where: { id: project.id },
      data: { priority }
    })
    return res.status(200).json({ msg: 'Project updated successfully' })
  } catch (error: any) {
    return res.status(500).json({ msg: error.message })
  }
}

export const updateProjectDeadline = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { deadline }: { deadline: string } = req.body
    const project: null | { id: string } = await prisma.projects.findUnique({ where: { id: req.projectId } })
    if (project == null) {
      return res.status(404).json({ msg: 'Project not found' })
    }
    await prisma.projects.update({
      where: { id: project.id },
      data: { deadline }
    })
    return res.status(200).json({ msg: 'Project updated successfully' })
  } catch (error: any) {
    return res.status(500).json({ msg: error.message })
  }
}

export const deleteProject = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const project = await prisma.projects.delete({
      where: {
        user_id: req.userId,
        id: req.projectId
      }
    })
    if (project == null) {
      return res.status(404).json({ message: 'Project not found' })
    }
    res.status(200).json({ msg: 'Project deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}
