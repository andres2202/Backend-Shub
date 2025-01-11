import  jwt from 'jsonwebtoken';
import { ITokenPayload } from '../interfaces/tokenPayload';
import bcrypt from 'bcryptjs';

export const generateToken = (payload: ITokenPayload): Promise<string> => {
    return new Promise((resolve, reject) => {
        const secret = process.env.JWT_SECRET as string;
        if (!secret) {
            reject('No secret provided');
        }
        jwt.sign(payload, secret, {expiresIn: '1h'}, (err, token) => {
            if(err) reject(err);
            resolve(token as string);
        });
    });
}

export const verifyToken = (token: string): Promise<ITokenPayload> => {
    return new Promise((resolve, reject) => {
        const secret = process.env.JWT_SECRET as string;
        if (!secret) {
            reject('No secret provided');
        }
        jwt.verify(token, secret, (err, payload) => {
            if(err) reject(err);
            resolve(payload as ITokenPayload);
        });
    });
}

export const encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export const comparePassword = async (password: string, receivedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, receivedPassword);
}