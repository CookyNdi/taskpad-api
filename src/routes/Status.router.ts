import express from 'express'

import { authentication, isAdmin } from '../helpers/middleware'
import { addStatus, deleteStatus, getAllStatus, getStatusId, updateStatus } from '../controllers/Status.controller'

const route = express.Router()

route.get('/api/status', authentication as unknown as any, isAdmin as unknown as any, getAllStatus as unknown as any)
route.get('/api/status/:id', authentication as unknown as any, isAdmin as unknown as any, getStatusId as unknown as any)
route.post('/api/status', authentication as unknown as any, isAdmin as unknown as any, addStatus as unknown as any)
route.patch(
  '/api/status/:id',
  authentication as unknown as any,
  isAdmin as unknown as any,
  updateStatus as unknown as any
)
route.delete(
  '/api/status/:id',
  authentication as unknown as any,
  isAdmin as unknown as any,
  deleteStatus as unknown as any
)

export default route
