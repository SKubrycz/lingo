import express, { Request, Response, NextFunction } from 'express';
import colors from 'colors';

const routeLogger = (req: Request, res: Response, next: NextFunction): void => {

    switch(req.method) {
        case "GET":
            console.log(colors.green(`${req.method} ${req.originalUrl}`));
            break;

            case "POST":
                console.log(colors.blue(`${req.method} ${req.originalUrl}`));
                break;
            case "PATCH" || "PUT":
                console.log(colors.yellow(`${req.method} ${req.originalUrl}`));
                break;
            case "DELETE":
                console.log(colors.red(`${req.method} ${req.originalUrl}`));
                break;
            default:
                console.log(`${req.method} ${req.originalUrl}`);
    }


next(); 

}

export default routeLogger;