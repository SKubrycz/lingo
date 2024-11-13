import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { isAuthenticated } from "./middleware/auth";
import routeLogger from "./middleware/routeLogger";

import homeRoute from "./routes/home";
import registerRoute from "./routes/register";
import loginRoute from "./routes/login";
import profileRoute from "./routes/profile";
import lessonsRoute from "./routes/lessons";
import lessonRoute from "./routes/lesson";
import logoutRoute from "./routes/logout";
import aboutRoute from "./routes/about";
import timeSpentRoute from "./routes/timeSpent";
import verifyRoute from "./routes/verify";

const app: Express = express();

const originDomain: string = "http://localhost:3001";

const routesArray: Router[] = [
  homeRoute,
  registerRoute,
  loginRoute,
  profileRoute,
  lessonRoute,
  lessonsRoute,
  logoutRoute,
  aboutRoute,
  timeSpentRoute,
  verifyRoute,
];

// let transporter = nodemailer.createTransport({
//   host: "localhost",
//   port: 1025,
// });

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

// transporter.sendMail({
//   from: "qwe@localhost",
//   to: "asd@localhost",
//   subject: "Hello Asd",
//   html: "<b>Welcome</b>, <i>Asd</i>",
// });

app.use(helmet());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Security-Policy", `script-src 'self' ${originDomain}`);
  return next();
});

app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: originDomain,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(routeLogger);

app.use(routesArray);

app.all("*", isAuthenticated, (req: Request, res: Response) => {
  res.status(404).send("Błąd 404: Nie znaleziono zawartości");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
