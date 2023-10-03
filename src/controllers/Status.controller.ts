import { PrismaClient } from '@prisma/client'
import { type Request, type Response, type NextFunction } from 'express'

const prisma = new PrismaClient()

export const getAllStatus = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const status = await prisma.status.findMany()
    res.status(200).json({ status })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const getStatusId = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const status = await prisma.status.findUnique({ where: { id: Number(req.params.id) } })
    if (status == null) {
      res.status(404).json({ msg: 'Status Not Found' })
    }
    res.status(200).json({ status })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const addStatus = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { title }: { title: string } = req.body
    await prisma.status.create({ data: { title } })
    res.status(201).json({ msg: 'Status Created' })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { title }: { title: string } = req.body
    await prisma.status.update({ where: { id: Number(req.params.id) }, data: { title } })
    res.status(201).json({ msg: 'Status Updated' })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const deleteStatus = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const status = await prisma.status.delete({ where: { id: Number(req.params.id) } })
    if (status == null) {
      res.status(404).json({ msg: 'Status Not Found' })
    }
    res.status(201).json({ msg: 'Status Deleted' })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}
