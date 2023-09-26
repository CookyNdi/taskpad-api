import express from 'express'
import {
  deleteUser,
  getUserById,
  getUsers,
  updateProfileImages,
  updateUserEmail,
  updateUserPassword,
  updateUsername,
  userRegistration
} from '../controllers/Users.controllers'

const route = express.Router()

route.get('/api/users', getUsers as unknown as any)
route.get('/api/users/:id', getUserById as unknown as any)

route.post('/api/registration', userRegistration as unknown as any)

route.patch('/api/users/edit/username/:id', updateUsername as unknown as any)
route.patch('/api/users/edit/email/:id', updateUserEmail as unknown as any)
route.patch('/api/users/edit/password/:id', updateUserPassword as unknown as any)
route.patch('/api/users/edit/image/:id', updateProfileImages as unknown as any)

route.delete('/api/users/delete/:id', deleteUser as unknown as any)

export default route
