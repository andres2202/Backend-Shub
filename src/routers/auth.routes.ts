import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";

export default function authRouter(router: Router): void {
  const authController = new AuthController();

  /**
   * @openapi
   * components:
   *  schemas:
   *   createUser:
   *    type: object
   *    required:
   *     - email
   *     - password
   *     - role
   *    properties:
   *     email:
   *      type: string
   *      description: The email of the user
   *      required: true
   *     password:
   *      type: string
   *      description: The password of the user
   *      required: true
   *     role:
   *      type: string
   *      description: The role of the user
   *      required: true
   *    example:
   *     email: jhon.doe@example.com
   *     password: password
   *     role: user
   *   loginResponse:
   *    type: object
   *    properties:
   *     id:
   *      type: number
   *      description: The user ID
   *     role:
   *      type: string
   *      description: The role of the user  
   *   loginRequest:
   *    type: object
   *    required:
   *     - email
   *     - password
   *    properties:
   *     email:
   *      type: string
   *      description: The email of the user
   *      required: true
   *     password:  
   *      type: string
   *      description: The password of the user
   *      required: true
   *    example:
   *     email: jhon.doe@example.com
   *     password: password
   */

  /**
   * @openapi
   * /api/register:
   *  post:
   *     tags:
   *     - Register
   *     summary: Register a new user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/createUser'
   *     responses:
   *       201:
   *        description: User registered successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/loginResponse'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/BadRequest'
   *
   */
  router.post("/api/register", authController.register);

  /**
   * @openapi
   * /api/login:
   *  post:
   *     tags:
   *     - Login
   *     summary: login a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/loginRequest'
   *     responses:
   *       200:
   *        description: User logged in successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/loginResponse'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/BadRequest'
   *
   */
  router.post("/api/login", authController.login);
}
