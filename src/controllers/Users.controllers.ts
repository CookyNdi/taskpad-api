/* eslint-disable @typescript-eslint/indent */
import { PrismaClient } from '@prisma/client'
import { type Request, type Response, type NextFunction } from 'express'
import argon2 from 'argon2'
import path from 'path'
import fs from 'fs'
import type fileUpload from 'express-fileupload'
import { passwordCheck, emailCheck, usernameCheck } from '../helpers/Utils'
import type { MvFunction } from '../helpers/main.type'
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../helpers/jwtConfig'

const prisma = new PrismaClient()
interface CustomRequest extends Request {
  userId: string
  email: string
}

export const getUsers = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        image_url: true,
        createdAt: true,
        updatedAt: true
      }
    })
    res.status(200).json(users)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const getUserById = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const users = await prisma.users.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        username: true,
        email: true,
        image_url: true,
        createdAt: true,
        updatedAt: true
      }
    })
    res.status(200).json(users)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const userRegistration = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {
      username,
      email,
      password,
      confPassword
    }: {
      username: string
      email: string
      password: string
      confPassword: string
    } = req.body
    const usernameCheckResult = await usernameCheck(username)
    if (!usernameCheckResult.valid) {
      return res.status(400).json(usernameCheckResult)
    }
    const emailCheckResult = await emailCheck(email)
    if (!emailCheckResult.valid) {
      return res.status(400).json(emailCheckResult)
    }
    const passwordCheckResult = await passwordCheck(password, confPassword)
    if (!passwordCheckResult.valid) {
      return res.status(400).json(passwordCheckResult)
    }
    const hashedPassword = await argon2.hash(password)
    await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        image_url: 'http://localhost:5000/images/profile-images/default.jpg',
        token: ''
      }
    })
    res.status(200).json({ msg: 'User registered successfully' })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

export const updateUsername = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {
      username,
      password
    }: {
      username: string
      password: string
    } = req.body
    const user: null | {
      id: string
      password: string
    } = await prisma.users.findUnique({
      where: { id: req.userId }
    })
    if (user == null) {
      return res.status(404).json({ msg: 'User not found' })
    }
    if (username === '') {
      return res.status(400).json({ msg: 'Please fill the username' })
    }
    const usernameCheckResult = await usernameCheck(username)
    if (!usernameCheckResult.valid) {
      return res.status(400).json(usernameCheckResult)
    }
    const passwordMatch = await argon2.verify(user.password, password)
    if (!passwordMatch) {
      return res.status(400).json({ msg: 'The password you entered is incorrect' })
    }
    await prisma.users.update({
      where: { id: user.id },
      data: { username }
    })
    return res.status(200).json({ msg: 'Username updated successfully' })
  } catch (error: any) {
    return res.status(500).json({ msg: error.message })
  }
}

export const updateUserEmail = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {
      email,
      password
    }: {
      email: string
      password: string
    } = req.body
    const user: null | {
      id: string
      password: string
    } = await prisma.users.findUnique({ where: { id: req.userId } })
    if (user == null) {
      return res.status(404).json({ msg: 'User not found' })
    }
    if (email === '') {
      return res.status(400).json({ msg: 'Please fill the email' })
    }
    const emailCheckResult = await emailCheck(email)
    if (!emailCheckResult.valid) {
      return res.status(400).json(emailCheckResult)
    }
    const passwordMatch = await argon2.verify(user.password, password)
    if (!passwordMatch) {
      return res.status(400).json({ msg: 'The password you entered is incorrect' })
    }
    await prisma.users.update({
      where: { id: user.id },
      data: { email }
    })
    return res.status(200).json({ msg: 'email updated successfully' })
  } catch (error: any) {
    return res.status(500).json({ msg: error.message })
  }
}

export const updateUserPassword = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {
      password,
      confPassword,
      oldPassword
    }: {
      password: string
      confPassword: string
      oldPassword: string
    } = req.body
    const user: null | {
      id: string
      password: string
    } = await prisma.users.findUnique({ where: { id: req.userId } })
    if (user == null) {
      return res.status(404).json({ msg: 'User not found' })
    }
    if (password === '' && confPassword === '') {
      return res.status(400).json({ msg: 'Please fill the password' })
    }
    const passwordCheckResult = await passwordCheck(password, confPassword)
    if (!passwordCheckResult.valid) {
      return res.status(400).json(passwordCheckResult)
    }
    const passwordMatch = await argon2.verify(user.password, oldPassword)
    if (!passwordMatch) {
      return res.status(400).json({ msg: 'The password you entered is incorrect' })
    }
    const hashPassword = await argon2.hash(password)
    await prisma.users.update({
      where: { id: user.id },
      data: { password: hashPassword }
    })
    return res.status(200).json({ msg: 'password updated successfully' })
  } catch (error: any) {
    return res.status(500).json({ msg: error.message })
  }
}

export const updateProfileImages = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const user: null | {
      id: string
      image_url: string
    } = await prisma.users.findUnique({ where: { id: req.userId } })
    if (user == null) return res.status(404).json({ msg: 'User not found' })
    const file:
      | fileUpload.UploadedFile
      | fileUpload.UploadedFile[]
      | null
      | undefined
      | {
          name: string
          size: number
          md5: string
          mv: MvFunction
        } = req.files?.file

    if (Array.isArray(file)) {
      return res.status(400).json({ msg: 'Please upload only one file' })
    }
    if (file !== null && file !== undefined) {
      const fileSize = file.size
      const ext = path.extname(file.name)
      const fileName = file.md5 + ext
      const allowedType = ['.png', '.jpg', '.jpeg', '.webp']
      const url = `${req.protocol}://${req.get('host')}/images/profile-images/${fileName}`
      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: 'The image you input must be in format (png, jpg, jpeg, webp)' })
      }
      if (fileSize > 1000000) return res.status(422).json({ msg: 'Ukuran gambar harus dibawah 1mb' })
      if (user.image_url !== 'http://localhost:5000/images/profile-images/default.jpg') {
        const url = user.image_url
        const urlParts = url.split('/')
        const fileName = urlParts[urlParts.length - 1]
        const filePath = `./public/images/profile-images/${fileName}`
        fs.unlinkSync(filePath)
      }
      file.mv(`./public/images/profile-images/${fileName}`, (err: null) => {
        if (err !== null && err !== undefined) {
          console.error('Error moving the file:', err)
        }
      })
      await prisma.users.update({
        where: {
          id: user.id
        },
        data: {
          image_url: url
        }
      })
      res.status(200).json({ msg: 'Profile Image Updated Successfully...' })
    } else {
      return res.status(400).json({ msg: 'Please upload a file' })
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const user = await prisma.users.delete({
      where: { id: req.userId }
    })
    if (user == null) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ msg: 'Account deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}

export const login = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const {
      username,
      password
    }: {
      username: string
      password: string
    } = req.body
    const user = await prisma.users.findUnique({ where: { username } })
    if (user == null) {
      return res.status(404).json({ msg: 'Username not registered' })
    }
    const passwordMatch = await argon2.verify(user.password, password)
    if (!passwordMatch) {
      return res.status(400).json({ msg: 'Incorrect password' })
    }
    const accessToken = createAccessToken(user.id)
    const refreshToken = createRefreshToken(user.id)
    // Atur cookie access token
    res.cookie('access_token', accessToken, {
      maxAge: 1200,
      httpOnly: true
      // secure: true, // Hanya akan dikirim melalui HTTPS jika true
      // sameSite: "strict", // Atur ke 'lax' atau 'none' sesuai kebutuhan
    })

    // Atur cookie refresh token
    res.cookie('refresh_token', refreshToken, {
      maxAge: 604800000,
      httpOnly: true
      // secure: true,
      // sameSite: "strict",
    })

    res.status(200).json({ msg: 'Login Successfully' })
  } catch (error: any) {
    res.status(500).json({ msg: error.message })
  }
}

export const token = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  const refreshToken: string | null = req.cookies.refresh_token
  console.log(refreshToken)
  if (refreshToken == null) {
    return res.status(401).json({ msg: 'Please Login First!!' })
  }
  const accessToken = verifyRefreshToken(refreshToken)
  if (accessToken.valid) {
    res.cookie('access_token', accessToken.message, {
      maxAge: 1200,
      httpOnly: true
    })
  } else {
    console.log(accessToken.message)
  }
  res.status(200).json({ msg: 'Token Renewed' })
}
