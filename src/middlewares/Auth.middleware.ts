import { Request, Response, NextFunction } from "express";
import { ITokenPayload, ITokenDecoded } from "src/interfaces/tokenPayload";
import { verifyToken } from "../helpers/utils";
import jwt from "jsonwebtoken";

export class AuthMiddleware {
    public authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
      
        if (!authHeader) {
           res.status(401).json({ message: "Token no proporcionado" });
           return;
        }
      
        const token = authHeader.split(" ")[1]; 
        try {
            const secret = process.env.JWT_SECRET as string;
            const tokenDecoded:ITokenDecoded = jwt.verify(token, secret) as ITokenDecoded;
            req.body.tokenDecoded = tokenDecoded;
            next(); 
        } catch (error) {
          res.status(403).json({ message: "Token inválido o expirado" });
        }
    }
}

