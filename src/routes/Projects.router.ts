import express from 'express'

import { authentication, authorization } from '../helpers/middleware'
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProjectDeadline,
  updateProjectDescription,
  updateProjectName,
  updateProjectPriority
} from '../controllers/Projects.controller'

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
route.post('/api/project', authentication as unknown as any, createProject as unknown as any)

route.patch(
  '/api/project/edit/name',
  authentication as unknown as any,
  authorization as unknown as any,
  updateProjectName as unknown as any
)

route.patch(
  '/api/project/edit/description',
  authentication as unknown as any,
  authorization as unknown as any,
  updateProjectDescription as unknown as any
)

route.patch(
  '/api/project/edit/priority',
  authentication as unknown as any,
  authorization as unknown as any,
  updateProjectPriority as unknown as any
)

route.patch(
  '/api/project/edit/deadline',
  authentication as unknown as any,
  authorization as unknown as any,
  updateProjectDeadline as unknown as any
)

route.delete(
  '/api/project',
  authentication as unknown as any,
  authorization as unknown as any,
  deleteProject as unknown as any
)

export default route
