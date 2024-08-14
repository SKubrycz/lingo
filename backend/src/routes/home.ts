import express, { Response, Router } from 'express';
import { RequestLogin } from '../middleware/auth';

const router: Router = express.Router();

const auth = require('../middleware/auth');

router.get('/', auth.isAuthenticated, async (req: RequestLogin, res: Response) => {
    console.log(`req.login ${req.login}`);
    
    let sessionUser: boolean = false;
    if (req.login) {
        sessionUser = true;
        res.status(403).send(sessionUser);
    } else {
        res.status(200).send(sessionUser);
    }

    console.log(`sessionUser ${sessionUser}`);
});


export default router;