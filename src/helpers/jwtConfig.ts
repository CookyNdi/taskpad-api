import jwt, { type JwtPayload } from 'jsonwebtoken'

export const createAccessToken = (userId: string): string => {
  const JWT_SECRET_ACCESS: string = process.env.JWT_SECRET_ACCESS ?? ''
  const payload = {
    id: userId
  }
  return jwt.sign(payload, JWT_SECRET_ACCESS, { expiresIn: '1200s' })
}

export const createRefreshToken = (userId: string): string => {
  const JWT_SECRET_REFRESH: string = process.env.JWT_SECRET_REFRESH ?? ''
  const payload = {
    id: userId
  }
  return jwt.sign(payload, JWT_SECRET_REFRESH, { expiresIn: '7d' })
}

export const verifyAccessToken = (
  token: string
): {
  valid: boolean
  message: string
} => {
  const validationResult = { valid: true, message: '' }
  try {
    const JWT_SECRET_ACCESS: string = process.env.JWT_SECRET_ACCESS ?? ''
    const decodedToken: string | JwtPayload = jwt.verify(token, JWT_SECRET_ACCESS)
    validationResult.valid = true
    validationResult.message = (decodedToken as JwtPayload).id
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      validationResult.valid = false
      validationResult.message = 'Token has expired'
    } else {
      validationResult.valid = false
      validationResult.message = 'Token is invalid'
    }
  }
  return validationResult
}

export const verifyRefreshToken = (
  refreshToken: string
): {
  valid: boolean
  message: string
} => {
  const validationResult = { valid: true, message: '' }
  try {
    const JWT_SECRET_REFRESH: string = process.env.JWT_SECRET_REFRESH ?? ''
    const JWT_SECRET_ACCESS: string = process.env.JWT_SECRET_ACCESS ?? ''

    const decoded = jwt.verify(refreshToken, JWT_SECRET_REFRESH)
    const payload = { id: (decoded as JwtPayload).id }
    const accessToken = jwt.sign(payload, JWT_SECRET_ACCESS, { expiresIn: '1200s' })
    validationResult.valid = true
    validationResult.message = accessToken
  } catch (error: any) {
    validationResult.valid = false
    validationResult.message = error.message
  }
  return validationResult
}
