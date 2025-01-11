export interface ITokenPayload{
    userId: number;
    email: string;
    role: any;
}

export interface ITokenDecoded{
    userId: number;
    email: string;
    role: any;
    iat: number;
    exp: number;
}