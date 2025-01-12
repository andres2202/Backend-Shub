import { Router } from "express";
import { HotelController } from "../controllers/hotel.controller";
import { AuthMiddleware } from "../middlewares/Auth.middleware";

export default function hotelRouter(router: Router): Router {
  const hotelController = new HotelController();
  const authMiddleware = new AuthMiddleware();

  /**
   * @openapi
   * components:
   *  schemas:
   *   createHotel:
   *    type: object
   *    required: 
   *     - name
   *     - location
   *    properties:
   *     name:
   *      type: string
   *      description: The name of the hotel
   *      required: true
   *     location:
   *      type: string
   *      description: The location of the hotel
   *      required: true
   *    example:
   *     name: Hotel Name
   *     location: Hotel Location
   *   hotelInfo:
   *    type: object
   *    required:
   *     - id
   *     - name
   *     - location
   *    example:
   *     id: 1
   *     name: Hotel Name  
   *     location: Hotel Location  
   *   hotelsList:
   *    type: array
   *    items:
   *     $ref: '#/components/schemas/hotelInfo'
   */

  /**
   * @openapi
   * /api/hotels:
   *  get:
   *     tags:
   *     - Hotels
   *     summary: get all hotels
   *     responses:
   *       200:
   *        description: List of hotels fetched successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/hotelsList'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/BadRequest'
   *
   */
  router.get('/api/hotels', authMiddleware.authenticateToken, hotelController.getHotels);

  /**
   * @openapi
   * /api/hotels:
   *  post:
   *     tags:
   *     - Hotels
   *     summary: Register a new hotel
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/createHotel'
   *     responses:
   *       201:
   *        description: hotel registered successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/hotelInfo'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/BadRequest'
   *
   */
  router.post('/api/hotels', authMiddleware.authenticateToken, hotelController.createHotel);

  /**
   * @openapi
   * /api/hotels/{id}:
   *  put:
   *     tags:
   *     - Hotels
   *     summary: Update a hotel
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        description: ID of the hotel to update
   *        schema:  
   *         type: integer
   *         example: 1
   *     requestBody:
   *      required: true
   *      content:
   *       application/json:
   *        schema:
   *         $ref: '#/components/schemas/createHotel'
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
  router.put('/api/hotels/:id', authMiddleware.authenticateToken, hotelController.updateHotel);

  /**
   * @openapi
   * /api/hotels/{id}:
   *  delete:
   *     tags:
   *     - Hotels
   *     summary: Delete a hotel
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        description: ID of the hotel to delete
   *        schema:  
   *         type: integer
   *         example: 1
   *     responses:
   *       200:
   *        description: hotel deleted successfully
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
  router.delete('/api/hotels/:id', authMiddleware.authenticateToken, hotelController.deleteHotel);
  return router;
}