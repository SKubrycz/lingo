import { ObjectId } from "mongodb";
import express, { Request, Response } from 'express';

import { RequestLogin } from '../middleware/auth';

import { findOneUserByLogin } from '../assets/queries';
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

interface FindUser {
    _id: ObjectId;
    login: string;
    createdDate: Date;
} // !not equal to the one in queries.ts

interface SentUser {
    id: ObjectId;
    login: string;
    createdDate: string; // parsed
    sessionUser: boolean;
}

router.get('/profile', isAuthenticated, async (req: Request, res: Response) => {
    try {

        console.log('/profile');
        /* console.log('res.user:' + res.user.login);
        
        const result = await queries.findOneUserByLogin(res.user.login);

        let sessionUser = false;
        if (res.user) sessionUser = true;

        const fetched = {
            id: result._id,
            login: result.login,
            sessionUser: sessionUser,
        } */

        return res.status(200).send('Not found');

    } catch (error) {
        res.status(500).send(`Error /profile ${error}`);
    }
})

router.get('/profile/:id', isAuthenticated, async (req: RequestLogin, res: Response) => {
    try {
        const login = await req.params.id;

        console.log(`get in /profile/:id: ${login}`);

        const result: FindUser | null = await findOneUserByLogin(login);

        if (result) {
            console.log(result.login);

            let sessionUser = false;
            if (req.login === result.login) sessionUser = true;
    
            const parseDate: string = result.createdDate.toLocaleDateString();
    
            const fetched: SentUser = {
                id: result._id,
                login: result.login,
                createdDate: parseDate,
                sessionUser: sessionUser,
            }
    
            return res.status(200).send(fetched);
        } else {
            res.status(404)
        }
    } catch (error) {
        res.status(500).send(`Error /profile/:id ${error}`);
    }
});

export default router;