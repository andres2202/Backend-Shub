import { Router, Request, Response } from "express";
import { Users } from "../models/users";
import { encryptPassword, generateToken, comparePassword } from "../helpers/utils";
import { UserResponse, User, CreateUser } from "../interfaces/user";
import { UserService } from "../services/user.services";

export class AuthController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public login = async (req: Request, res: Response) => {
        try {
            let { email, password } = req.body;
            const userFound = await this.userService.getUserByEmail(email);
            if (!userFound) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const isValidPassword = await comparePassword(password, userFound?.password as string);
            if (!isValidPassword ) {  
                res.status(401).json({ message: 'Invalid password' });
            }else{
                const token = await generateToken({ userId: userFound?.id as number, email: userFound?.email as string, role: userFound?.role });
                const userResponse: UserResponse = { id: userFound.id, role: userFound.role };
                res.header('Authorization', `Bearer ${token}`);
                res.status(200).json(userResponse);
            }
        } catch (error) {
            res.status(500).json({ message : (error as Error)?.message });
        }
    }

    public register = async (req: Request, res: Response) => {
        try {
            let { email, password, role } = req.body;
            const userFound = await this.userService.getUserByEmail(email);
            if (userFound) {
                res.status(400).json({ message: 'User already exists' });
            }else{
                password = await encryptPassword(password);
                const userToCreate: CreateUser = { email, password, role };
                const userCreated = await this.userService.createUser(userToCreate);
                const token = await generateToken({userId: userCreated.id, email: userCreated.email, role: userCreated.role});
                const userResponse: UserResponse = { id: userCreated.id, role: userCreated.role };
                res.header('Authorization', `Bearer ${token}`);
                res.status(201).json(userResponse);
            }
        } catch (error) {
            res.status(500).json({ message : (error as Error)?.message });
        }
    }
}