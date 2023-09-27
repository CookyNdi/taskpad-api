import express from 'express'
import {
  deleteUser,
  getUserById,
  getUsers,
  login,
  token,
  updateProfileImages,
  updateUserEmail,
  updateUserPassword,
  updateUsername,
  userRegistration
} from '../controllers/Users.controllers'
import { authentication } from '../helpers/middleware'

const route = express.Router()

route.get('/api/users', authentication as unknown as any, getUsers as unknown as any)
route.get('/api/user', authentication as unknown as any, getUserById as unknown as any)

route.post('/api/registration', userRegistration as unknown as any)
route.post('/api/login', login as unknown as any)
route.get('/api/token', token as unknown as any)

route.patch('/api/user/edit/username', authentication as unknown as any, updateUsername as unknown as any)
route.patch('/api/user/edit/email', authentication as unknown as any, updateUserEmail as unknown as any)
route.patch('/api/user/edit/password', authentication as unknown as any, updateUserPassword as unknown as any)
route.patch('/api/user/edit/image', authentication as unknown as any, updateProfileImages as unknown as any)

route.delete('/api/user/delete', authentication as unknown as any, deleteUser as unknown as any)

export default route
