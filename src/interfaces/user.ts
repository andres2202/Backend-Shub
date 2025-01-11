export interface User {
    id: number;
    email: string;
    password?: string;
    role: any;
}

export type UserResponse = Pick<User, 'id' & 'role'>;
export type CreateUser = Omit<User, 'id'>;
export type UserWithoutPassword = Omit<User, 'password'>;