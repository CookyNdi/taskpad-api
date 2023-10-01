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
 * /api/users:
 *   get:
 *     summary: Get a list of users
 *     description: Endpoint to retrieve a list of users.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized, authentication failed
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve user information based on the provided user ID.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The user object
 *       401:
 *         description: Unauthorized, authentication failed
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /api/registration:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username.
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               confPassword:
 *                 type: string
 *                 description: Confirmation of the user's password.
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   description: Validation status.
 *                 type:
 *                   type: string
 *                   description: Type of error.
 *                 errorMessage:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Endpoint to authenticate a user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Login Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Login Successfully
 *       400:
 *         description: Incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Username not registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *
 */

/**
 * @swagger
 * /api/user/edit/username:
 *   patch:
 *     summary: Update username for a user
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     description: Update the Username of the logged-in user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Username updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Username updated successfully
 *       401:
 *         description: Unauthorized, authentication failed
 *       400:
 *         description: Bad request, validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   description: Validation status.
 *                 type:
 *                   type: string
 *                   description: Type of error.
 *                 errorMessage:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /api/user/edit/email:
 *   patch:
 *     summary: Update user's email
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     description: Update the email of the logged-in user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: New email address for the user
 *               password:
 *                 type: string
 *                 description: User password for authentication
 *     responses:
 *       200:
 *         description: Email updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating success
 *                   example: Email updated successfully
 *       401:
 *         description: Unauthorized, authentication failed
 *       400:
 *         description: Bad request, validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   description: Validation status.
 *                 type:
 *                   type: string
 *                   description: Type of error.
 *                 errorMessage:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /api/user/edit/password:
 *   patch:
 *     summary: Update user's password
 *     tags:
 *       - Users
 *     description: Update the password of the logged-in user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password for the user
 *               confPassword:
 *                 type: string
 *                 description: Confirmation of the new password
 *               oldPassword:
 *                 type: string
 *                 description: Old password for authentication
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating success
 *                   example: Password updated successfully
 *       401:
 *         description: Unauthorized, authentication failed
 *       400:
 *         description: Bad request, validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   description: Validation status.
 *                 type:
 *                   type: string
 *                   description: Type of error.
 *                 errorMessage:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /api/user/edit/image:
 *   patch:
 *     summary: Update user's password and profile image
 *     tags:
 *       - Users
 *     description: Update the password and profile image of the logged-in user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (png, jpg, jpeg, webp)
 *     responses:
 *       200:
 *         description: Profile Image Updated Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating success
 *                   example: Profile Image Updated Successfully
 *       400:
 *         description: Please upload a file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating an error
 *                   example: Please upload a file
 *       422:
 *         description: Image validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating an error
 *                   example: The image you input must be in format (png, jpg, jpeg, webp) or the file size must be below 1MB
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
 * /api/token:
 *   get:
 *     summary: Get a new token
 *     description: Get a new token for authentication.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Token Renewed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message indicating token renewal success.
 *                   example: 'Token Renewed'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /api/logout:
 *   delete:
 *     summary: Logout user
 *     description: Endpoint to log the user out.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating the user has been logged out.
 *
 */
