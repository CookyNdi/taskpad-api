import express from 'express'

import { authentication, isAdmin } from '../helpers/middleware'
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategoryId,
  updateCategory
} from '../controllers/Category.controller'

const route = express.Router()

route.get(
  '/api/category',
  authentication as unknown as any,
  isAdmin as unknown as any,
  getAllCategory as unknown as any
)
route.get(
  '/api/category/:id',
  authentication as unknown as any,
  isAdmin as unknown as any,
  getCategoryId as unknown as any
)
route.post('/api/task', authentication as unknown as any, addCategory as unknown as any)
route.patch(
  '/api/category/:id',
  authentication as unknown as any,
  isAdmin as unknown as any,
  updateCategory as unknown as any
)
route.delete(
  '/api/category/:id',
  authentication as unknown as any,
  isAdmin as unknown as any,
  deleteCategory as unknown as any
)

export default route
