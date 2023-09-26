import express from 'express'
import {
  deleteUser,
  getUserById,
  getUsers,
  login,
  updateProfileImages,
  updateUserEmail,
  updateUserPassword,
  updateUsername,
  userRegistration
} from '../controllers/Users.controllers'
import { authentication } from '../helpers/middleware'

const route = express.Router()

route.get('/api/users', authentication as unknown as any, getUsers as unknown as any)
route.get('/api/users/:id', getUserById as unknown as any)

route.post('/api/registration', userRegistration as unknown as any)
route.post('/api/login', login as unknown as any)

route.patch('/api/users/edit/username/:id', updateUsername as unknown as any)
route.patch('/api/users/edit/email/:id', updateUserEmail as unknown as any)
route.patch('/api/users/edit/password/:id', updateUserPassword as unknown as any)
route.patch('/api/users/edit/image/:id', updateProfileImages as unknown as any)

route.delete('/api/users/delete/:id', deleteUser as unknown as any)

export default route
