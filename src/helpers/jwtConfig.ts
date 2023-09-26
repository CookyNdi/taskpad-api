import jwt, { type JwtPayload } from 'jsonwebtoken'

export const createAccessToken = (payload: string): string => {
  const JWT_SCRET_ACCESS: string = process.env.JWT_SCRET_ACCESS ?? ''
  return jwt.sign(payload, JWT_SCRET_ACCESS, { expiresIn: '1200s' })
}

export const createRefreshToken = (payload: string): string => {
  const JWT_SCRET_REFRESH: string = process.env.JWT_SCRET_REFRESH ?? ''
  return jwt.sign(payload, JWT_SCRET_REFRESH, { expiresIn: '7d' })
}

export const verifyAccessToken = (
  token: string
): {
  valid: boolean
  message: string
} => {
  const validationResult = { valid: true, message: '' }
  try {
    const JWT_SCRET_ACCESS: string = process.env.JWT_SCRET_ACCESS ?? ''
    const decodedToken: string | JwtPayload = jwt.verify(token, JWT_SCRET_ACCESS)
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

export const verifyRefreshToken = (refreshToken: string): object => {
  try {
    const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET ?? ''
    const JWT_SECRET_ACCESS: string = process.env.JWT_SECRET_ACCESS ?? ''

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
    const payload = { id: (decoded as JwtPayload).id }
    const accessToken = jwt.sign(payload, JWT_SECRET_ACCESS, { expiresIn: '1200s' })
    return { accessToken }
  } catch (error: any) {
    return { error: error.message }
  }
}
