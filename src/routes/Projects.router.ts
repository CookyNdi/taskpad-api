import express from 'express'

import { authentication, authorization } from '../helpers/middleware'
import { createProject, deleteProject, getProjectById, getProjects } from '../controllers/Projects.controller'

const route = express.Router()

route.get(
  '/api/projects',
  authentication as unknown as any,
  authorization as unknown as any,
  getProjects as unknown as any
)
route.get(
  '/api/project/:id',
  authentication as unknown as any,
  authorization as unknown as any,
  getProjectById as unknown as any
)
route.post(
  '/api/project',
  authentication as unknown as any,
  createProject as unknown as any
)
route.delete(
  '/api/project',
  authentication as unknown as any,
  authorization as unknown as any,
  deleteProject as unknown as any
)

export default route
