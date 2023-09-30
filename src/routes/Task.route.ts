import express from 'express'

import { authentication, projectAuthor, taskAuthor } from '../helpers/middleware'
import { createTask, getTaskById, updateTaskStatus, updateTaskTitle } from '../controllers/Task.controllers'

const route = express.Router()

route.get(
  '/api/task/:id',
  authentication as unknown as any,
  projectAuthor as unknown as any,
  getTaskById as unknown as any
)
route.post('/api/task', authentication as unknown as any, createTask as unknown as any)
route.patch(
  '/api/task/update/title/:id',
  authentication as unknown as any,
  taskAuthor as unknown as any,
  updateTaskTitle as unknown as any
)
route.patch(
  '/api/task/update/status/:id',
  authentication as unknown as any,
  projectAuthor as unknown as any,
  updateTaskStatus as unknown as any
)
route.delete(
  '/api/task/delete/:id',
  authentication as unknown as any,
  projectAuthor as unknown as any,
  updateTaskStatus as unknown as any
)

export default route
