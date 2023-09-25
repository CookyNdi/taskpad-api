import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const usernameCheck = async (
  username: string
): Promise<{
  valid: boolean
  type: string
  errorMessage: string
}> => {
  const validationResult = { valid: true, type: '', errorMessage: '' }
  const existingUser: null | { username: string } = await prisma.users.findUnique({
    where: { username },
    select: { username: true }
  })
  if (existingUser !== null) {
    validationResult.valid = false
    validationResult.type = 'Username Taken'
    validationResult.errorMessage = `This Username is Already Registered: ${username}`
  }
  return validationResult
}

export const emailCheck = async (
  email: string
): Promise<{
  valid: boolean
  type: string
  errorMessage: string
}> => {
  const validationResult = { valid: true, type: '', errorMessage: '' }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(email)) {
    validationResult.valid = false
    validationResult.type = 'Not Email'
    validationResult.errorMessage = `This is not a valid email: ${email}`
  }
  const existingUser: null | { email: string } = await prisma.users.findUnique({
    where: { email },
    select: { email: true }
  })
  if (existingUser !== null) {
    validationResult.valid = false
    validationResult.type = 'Email Taken'
    validationResult.errorMessage = `This email is already registered: ${email}`
  }
  return validationResult
}

export const passwordCheck = async (
  password: string,
  confPassword: string
): Promise<{
  valid: boolean
  type: string
  errorMessage: string
}> => {
  const validationResult = {
    valid: true,
    type: '',
    errorMessage: ''
  }
  if (password !== confPassword) {
    validationResult.valid = false
    validationResult.type = 'Password Not Match'
    validationResult.errorMessage = 'Password and Confirm Password Do not Match'
  }
  const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Z!@#$%^&*].{7,}$/
  if (!passwordPattern.test(password)) {
    validationResult.valid = false
    validationResult.type = 'Password Pattern'
    validationResult.errorMessage =
      'The password must be at least 8 characters long, contain a capital initial letter, and must have at least one symbol,'
  }
  return validationResult
}

export const addDaysToCurrentDate = (daysToAdd: number): Date => {
  const currentDate = new Date()
  const futureDate = new Date()
  futureDate.setDate(currentDate.getDate() + daysToAdd)
  return futureDate
}
