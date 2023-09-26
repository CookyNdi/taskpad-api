import { PrismaClient } from '@prisma/client'
import { type Request, type Response, type NextFunction } from 'express'
import { verifyAccessToken } from './jwtConfig'

const prisma = new PrismaClient()

export const authentication = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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
    next()
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
