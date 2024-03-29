import { Request } from "express";

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface RegisterUserRequest extends Request {
    body: UserData;
}

export interface TokenPayload {
    sub: string;
    role: string;
}

export interface AuthRequest extends Request {
    auth: {
        sub: string;
        role: string;
        id: number;
    };
}

export interface AuthCookie {
    refreshToken: string;
    accessToken: string;
}

export interface IRefreshTokenPayload {
    id: string;
}
