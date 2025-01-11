import { Response,Request } from "express";
import { UserService } from "../services/user.services";
import { User } from "../interfaces/user";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    
    public getUsers = async (req: Request, res: Response) => {
        try {
            const role = req.body.tokenDecoded.role;
            if (role !== 'admin') {
                res.status(403).json({ message: 'You do not have the necessary permissions' });
                return;
            }
            let users: User[] = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: (error as Error)?.message });
        }
    }
}