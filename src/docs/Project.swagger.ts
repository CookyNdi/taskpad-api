// ----------------------------->>>>>>> Schemas <<<<<<<-----------------------------

// ---------------------*********** Authentication Schema ***********---------------------
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Bearer token authorization header
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get projects and related data
 *     tags: [Projects]
 *     description: Get projects, categories, and tasks.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Projects, categories, and tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 datas:
 *                   type: object
 *                   properties:
 *                     projects:
 *                       type: array
 *                       description: Array of projects
 *                       items:
 *                         type: object
 *                         description: Project object
 *                     category:
 *                       type: array
 *                       description: Array of categories
 *                       items:
 *                         type: object
 *                         description: Category object
 *                     task:
 *                       type: array
 *                       description: Array of tasks
 *                       items:
 *                         type: object
 *                         description: Task object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating an error
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/project/{id}:
 *   get:
 *     summary: Get a project by its ID
 *     tags: [Projects]
 *     description: Get project details and related categories based on project ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the project to retrieve
 *     responses:
 *       200:
 *         description: Project and related categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     project:
 *                       type: object
 *                       description: Project details
 *                     category:
 *                       type: array
 *                       description: Array of categories related to the project
 *                       items:
 *                         type: object
 *                         description: Category object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating an error
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/project:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     description: Create a new project with the provided details.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the project
 *               description:
 *                 type: string
 *                 description: Description of the project
 *               priority:
 *                 type: string
 *                 description: Priority of the project
 *               deadline:
 *                 type: string
 *                 description: Deadline of the project
 *               status:
 *                 type: number
 *                 description: Status of the project
 *               categoryIds:
 *                 type: array
 *                 description: Array of category IDs associated with the project
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating success
 *                   example: Project created successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating an error
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/project/edit/name/{id}:
 *   patch:
 *     summary: Update project name by its ID
 *     tags: [Projects]
 *     description: Update the name of a project based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the project to update its name
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name for the project
 *     responses:
 *       200:
 *         description: Project name updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating success
 *                   example: Project updated successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating an error
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/project/edit/description/{id}:
 *   patch:
 *     summary: Update project description by its ID
 *     tags: [Projects]
 *     description: Update the description of a project based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the project to update its description
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: New description for the project
 *     responses:
 *       200:
 *         description: Project description updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating success
 *                   example: Project updated successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating an error
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/project/edit/priority/{id}:
 *   patch:
 *     summary: Update project priority by its ID
 *     tags: [Projects]
 *     description: Update the priority of a project based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the project to update its priority
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               priority:
 *                 type: string
 *                 description: New priority for the project
 *     responses:
 *       200:
 *         description: Project priority updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating success
 *                   example: Project updated successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating an error
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/project/edit/deadline/{id}:
 *   patch:
 *     summary: Update project deadline by its ID
 *     tags: [Projects]
 *     description: Update the deadline of a project based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the project to update its deadline
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               deadline:
 *                 type: string
 *                 description: New deadline for the project
 *     responses:
 *       200:
 *         description: Project deadline updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating success
 *                   example: Project updated successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating an error
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/project/edit/categories/{id}:
 *   patch:
 *     summary: Update project categories by its ID
 *     tags: [Projects]
 *     description: Update the categories of a project based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the project to update its categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               categoryIds:
 *                 type: array
 *                 description: Array of category IDs to update for the project
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Project categories updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating success
 *                   example: Project updated successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating an error
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/project/edit/categories/{id}:
 *   patch:
 *     summary: Update project categories by its ID
 *     tags: [Projects]
 *     description: Update the categories of a project based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the project to update its categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               categoryIds:
 *                 type: array
 *                 description: Array of category IDs to update for the project
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Project categories updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating success
 *                   example: Project updated successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating an error
 *                   example: Internal server error
 */

/**
 * @swagger
 * /api/project/{id}:
 *   delete:
 *     summary: Delete a project by its ID
 *     tags: [Projects]
 *     description: Delete a project based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the project to delete
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating success
 *                   example: Project deleted successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating an error
 *                   example: Internal server error
 */
