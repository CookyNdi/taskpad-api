import { PrismaClient } from '@prisma/client'
import { type Request, type Response, type NextFunction } from 'express'

const prisma = new PrismaClient()

export const getAllCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const categories = await prisma.categories.findMany()
    res.status(200).json({ categories })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const getCategoryId = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const category = await prisma.categories.findUnique({ where: { id: Number(req.params.id) } })
    if (category == null) {
      res.status(404).json({ msg: 'Category Not Found' })
    }
    res.status(200).json({ category })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const addCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {
      title,
      color
    }: {
      title: string
      color: string
    } = req.body
    await prisma.categories.create({ data: { title, color } })
    res.status(201).json({ msg: 'Category Created' })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {
      title,
      color
    }: {
      title: string
      color: string
    } = req.body
    await prisma.categories.update({ where: { id: Number(req.params.id) }, data: { title, color } })
    res.status(201).json({ msg: 'Category Updated' })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const category = await prisma.categories.delete({ where: { id: Number(req.params.id) } })
    if (category == null) {
      res.status(404).json({ msg: 'Category Not Found' })
    }
    res.status(201).json({ msg: 'Category Deleted' })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}
