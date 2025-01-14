import { Router } from "express";
import { ReservationController } from "../controllers/reservation.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";

export default function reservationRouter(router: Router): Router {
    const reservationController = new ReservationController();
    const authMiddleware = new AuthMiddleware();

   /**
    * @openapi
    * components:
    *  schemas:
    *   createReservation:
    *    type: object
    *    required:
    *     - user_id
    *     - hotel_id
    *     - chek_in_date
    *     - check_out_date
    *    example:
    *     user_id: 1
    *     hotel_id: 1
    *     chek_in_date: 2021-09-01
    *     check_out_date: 2021-09-02
    *   reservationInfo:
    *    type: object
    *    required:
    *     - id
    *     - user_id
    *     - hotel_id
    *     - chek_in_date
    *     - check_out_date
    *     - hotel_name
    *    example:
    *     id: 1
    *     user_id: 1
    *     hotel_id: 1
    *     chek_in_date: 2021-09-01
    *     check_out_date: 2021-09-02
    *     hotel_name: hotel name
    *   reservationsList:
    *    type: array
    *    items:
    *     $ref: '#/components/schemas/reservationInfo'
    */  

    /**
   * @openapi
   * /api/reservations:
   *  get:
   *     tags:
   *     - Reservation
   *     summary: get all reservations for the user authenticated
   *     responses:
   *       200:
   *        description: List of reservations fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/reservationsList'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/BadRequest'
   *
   */
    router.get('/api/reservations', authMiddleware.authenticateToken, reservationController.getReservationsByUserId);

     /**
   * @openapi
   * /api/reservations:
   *  post:
   *     tags:
   *     - Reservation
   *     summary: create a new reservation for the authenticated user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/createReservation'
   *     responses:
   *       200:
   *        description: Reservation created successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/reservationInfo'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/BadRequest'
   *
   */
    router.post('/api/reservations', authMiddleware.authenticateToken, reservationController.createReservation);

    /**
   * @openapi
   * /api/reservations/{id}:
   *  put:
   *     tags:
   *     - Reservation
   *     summary: update a reservation for the authenticated user
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        description: ID of the reservation to update
   *        schema:  
   *         type: integer
   *         example: 1
   *     requestBody:
   *      required: true
   *      content:
   *       application/json:
   *        schema:
   *         $ref: '#/components/schemas/createReservation'
   *     responses:
   *       200:
   *        description: hotel updated successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/SuccessResponse'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/BadRequest'
   *
   */
    router.put('/api/reservations/:id', authMiddleware.authenticateToken, reservationController.updateReservation);

    /**
   * @openapi
   * /api/reservations/{id}:
   *  delete:
   *     tags:
   *     - Reservation
   *     summary: Delete a reservation for the authenticated user
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        description: ID of the reservation to delete
   *        schema:  
   *         type: integer
   *         example: 1
   *     responses:
   *       200:
   *        description: reservation deleted successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/SuccessResponse'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/BadRequest'
   *
   */
    router.delete('/api/reservations/:id', authMiddleware.authenticateToken, reservationController.deleteReservationById);
    return router;
}