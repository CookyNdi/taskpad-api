import express from 'express'

import { authentication, authorization, taskAuthor } from '../helpers/middleware'
import { createTask, getTaskById, getTasks, updateTaskStatus, updateTaskTitle } from '../controllers/Task.controllers'

const route = express.Router()

route.get('/api/tasks', authentication as unknown as any, authorization as unknown as any, getTasks as unknown as any)
route.get(
  '/api/task/:id',
  authentication as unknown as any,
  authorization as unknown as any,
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
  authorization as unknown as any,
  updateTaskStatus as unknown as any
)
route.delete(
  '/api/task/delete/:id',
  authentication as unknown as any,
  authorization as unknown as any,
  updateTaskStatus as unknown as any
)

export default route
