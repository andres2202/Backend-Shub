import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";

export default function userRouter(router: Router): Router {
  const userController = new UserController();
  const authMiddleware = new AuthMiddleware();
  /**
   * @openapi
   * components:
   *  schemas:
   *   userInfo:
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
   *   usersList:
   *    type: array
   *    items:
   *     $ref: '#/components/schemas/userInfo'
   */

  /**
   * @openapi
   * /api/users:
   *  get:
   *     tags:
   *     - Users
   *     summary: get all users
   *     responses:
   *       200:
   *        description: List of users fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/usersList'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/BadRequest'
   *
   */
  router.get('/api/users', authMiddleware.authenticateToken, userController.getUsers);

  return router;
}