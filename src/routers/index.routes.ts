import { Router } from "express";

import authRouter from "./auth.routes";
import userRouter from "./user.routes";

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
     *    example: Bad Request
     * 
     */

    authRouter(app);
    userRouter(app);
    app.get('/', (req, res) => {
        res.status(200).json({ message:'Welcome to the Hotels API'});
    });
    return router;
}