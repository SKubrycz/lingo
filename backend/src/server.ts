import express, { Express, Request, Response, NextFunction, Router } from 'express';
import helmet from 'helmet'
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { isAuthenticated } from './middleware/auth';

import homeRoute from './routes/home';
import registerRoute from './routes/register';
import loginRoute from './routes/login';
import profileRoute from './routes/profile';
import lessonsRoute from './routes/lessons';
import logoutRoute from './routes/logout';
import aboutRoute from './routes/about';

const app: Express = express();

const originDomain: string = 'http://localhost:3000';

const routesArray: Router[] = [
    homeRoute, registerRoute, loginRoute, profileRoute, lessonsRoute, logoutRoute, aboutRoute,
];

app.use(helmet());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Security-Policy', `script-src 'self' ${originDomain}`);
    return next();
});

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors({
    origin: originDomain,
    credentials: true,
}));

app.use(cookieParser());

app.use(routesArray);

app.all('*', isAuthenticated, (req: Request, res: Response) => {
    res.status(404).send('Błąd 404: Nie znaleziono zawartości');
})

app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));
