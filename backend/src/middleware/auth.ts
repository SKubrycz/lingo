import { Request, Response, NextFunction } from 'express';
import { ObjectId } from "mongodb";

const jwt = require('jsonwebtoken');

require('dotenv').config();

interface TokenData {
    _id: ObjectId,
    login: string;
    iat: number;
    exp: number;
}

export interface RequestLogin extends Request {
    login?: string;
}

const accessTokenExpiry: number = 1000 * 60 * 60;
const refreshTokenExpiry: number = 1000 * 60 * 60 * 24 * 30;

export const checkAuth = (req: RequestLogin, res: Response, next: NextFunction) => {
    let accessToken: string = req.cookies.access_token;
    let refreshToken: string = req.cookies.refresh_token;

    console.log(accessToken);

    if (!refreshToken) {
        res.clearCookie('access_token');
        return res.status(401).send('Nieautoryzowany');
    } else if (!accessToken && refreshToken) {
        const refreshTokenVerify: TokenData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        accessToken = jwt.sign({ _id: refreshTokenVerify._id, login: refreshTokenVerify.login }, process.env.ACCESS_TOKEN_SECRET);
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: accessTokenExpiry,
            sameSite: 'strict',
        });
    }

    try {
        const userVerify: TokenData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.login = userVerify.login;
        console.log(req.login);
        next();
    } catch (error) {
        res.status(401).send('Nieprawidłowy token');
    }
}

export const isAuthenticated = (req: RequestLogin, res: Response, next: NextFunction) => {
    let accessToken: string = req.cookies.access_token;
    let refreshToken: string = req.cookies.refresh_token;
    
    if (refreshToken) {
        if (!accessToken) {
            console.log(`!accessToken`);
            const refreshTokenVerify: TokenData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            accessToken = jwt.sign({ _id: refreshTokenVerify._id, login: refreshTokenVerify.login }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: accessTokenExpiry });
            res.cookie('access_token', accessToken, {
                httpOnly: true,
                maxAge: accessTokenExpiry,
                sameSite: 'strict',
            });
            accessToken = req.cookies.access_token;
            const userVerify: TokenData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.login = userVerify.login;
        } else if (accessToken) {
            const userVerify: TokenData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.login = userVerify.login;
        }
        next();
    } else {
        res.clearCookie('access_token');
        next();
    }
}