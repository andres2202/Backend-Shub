import { Users } from "../models/users"
import { CreateUser, User } from "../interfaces/user";

export class UserService {

    public async createUser(user: CreateUser): Promise<Users> {
        try {
            const userCreated = await Users.create({
                email: user.email,
                password: user.password,
                role: user.role
            });
            return userCreated;
        } catch (error) {
            throw new Error((error as Error)?.message);
        }
    }

    public async getUserByEmail(email: string): Promise<Users | null> {
        try {
            const userFound = await Users.findOne({ where: { email } });
            return userFound;
        } catch (error) {
            throw new Error((error as Error)?.message);
        }
    }

    public async getAllUsers(): Promise<Users[]> {
        try {
            const users = await Users.findAll({ attributes: ['id', 'email', 'role'] });
            return users;
        } catch (error) {
            throw new Error((error as Error)?.message);
        }
    }
}