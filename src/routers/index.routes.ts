import { Router } from "express";

import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import hotelRouter from "./hotel.routes";

const router = Router();

export default function (app: Router): Router {

    /**     
     * @openapi
     * components:
     *  schemas:
     *   BadRequest:
     *    type: object
     *    properties:
     *     message:
     *      type: string
     *      description: The error message
     *    example: 
     *     message: Bad request
     *   SuccessResponse:
     *    type: object
     *    properties:
     *    message:
     *     type: string
     *     description: The success message
     *    example:
     *     message: Successful operation
     * 
     */

    authRouter(app);
    userRouter(app);
    hotelRouter(app);
    app.get('/', (req, res) => {
        res.status(200).json({ message:'Welcome to the Hotels API'});
    });
    return router;
}