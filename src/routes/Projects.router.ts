import express from 'express'

import { authentication, projectAuthor } from '../helpers/middleware'
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProjectCategories,
  updateProjectDeadline,
  updateProjectDescription,
  updateProjectName,
  updateProjectPriority
} from '../controllers/Projects.controller'

const route = express.Router()

route.get('/api/projects', authentication as unknown as any, getProjects as unknown as any)
route.get(
  '/api/project/:id',
  authentication as unknown as any,
  projectAuthor as unknown as any,
  getProjectById as unknown as any
)
route.post('/api/project', authentication as unknown as any, createProject as unknown as any)

route.patch(
  '/api/project/edit/name/:id',
  authentication as unknown as any,
  projectAuthor as unknown as any,
  updateProjectName as unknown as any
)

route.patch(
  '/api/project/edit/description/:id',
  authentication as unknown as any,
  projectAuthor as unknown as any,
  updateProjectDescription as unknown as any
)

route.patch(
  '/api/project/edit/priority/:id',
  authentication as unknown as any,
  projectAuthor as unknown as any,
  updateProjectPriority as unknown as any
)

route.patch(
  '/api/project/edit/deadline/:id',
  authentication as unknown as any,
  projectAuthor as unknown as any,
  updateProjectDeadline as unknown as any
)

route.patch(
  '/api/project/edit/categories/:id',
  authentication as unknown as any,
  projectAuthor as unknown as any,
  updateProjectCategories as unknown as any
)

route.delete(
  '/api/project/delete/:id',
  authentication as unknown as any,
  projectAuthor as unknown as any,
  deleteProject as unknown as any
)

export default route
