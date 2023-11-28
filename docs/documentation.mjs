export const options = {
    swaggerDefinition: {
      openapi: '3.0.0', // Specify the OpenAPI version
      info: {
        title: 'Your API Documentation',
        version: '1.0.0',
        description: 'API documentation for your Node.js application',
      },
      tags:[
        {name:'Api',description:'routes related to global api routes'},
        {name:'User',description:'routes related to user operations'}
      ]
    },
    apis: ['docs/documentation.mjs','routes/userRoutes.mjs', 'path-to-.js'],
  };

  /**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /:
 *   get:
 *     tags:
 *       - Api
 *     security:
 *       - bearerAuth: []
 *     summary: Get data from the API
 *     responses:
 *       200:
 *         description: Successful response
 * /users:
 *   get:
 *     tags:
 *       - User 
 *     security:
 *       - bearerAuth: []
 *     summary: Make operations related to user
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 * /users/register:
 *   post:
 *     tags:
 *       - User 
 *     security:
 *       - bearerAuth: []
 *     summary: Create User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               cpf:
 *                 type: string
 *               telefone:
 *                 type: string
 *               nome:
 *                 type: string
 *               perfilFk:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 */