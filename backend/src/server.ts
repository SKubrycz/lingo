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

import { isAuthenticated, RequestLogin } from "./middleware/auth";
import routeLogger from "./middleware/routeLogger";

import homeRoute from "./routes/home";
import registerRoute from "./routes/register";
import loginRoute from "./routes/login";
import profileRoute from "./routes/profile";
import lessonsRoute from "./routes/lessons";
import lessonRoute from "./routes/lesson";
import logoutRoute from "./routes/logout";
import aboutRoute from "./routes/about";
import verifyRoute from "./routes/verify";
import deleteAccountRoute from "./routes/deleteAccount";
import adminRoute from "./routes/admin";
import { findAllRouteLanguages, findRoute } from "./assets/queries";

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
  verifyRoute,
  deleteAccountRoute,
  adminRoute,
];

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

app.all("*", isAuthenticated, async (req: RequestLogin, res: Response) => {
  const query = await req.query;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("not-found", String(query.language));
  if (!routeResult)
    return res
      .status(500)
      .send({ message: "Coś poszło nie tak po naszej stronie" });

  const languagesResult = await findAllRouteLanguages("/not-found");
  if (!languagesResult || languagesResult.length === 0)
    return res.status(500).send({
      message: routeResult.alerts.internalServerError
        ? routeResult.alerts.internalServerError
        : "Coś poszło nie tak po stronie serwera",
    });

  res.status(200).send({
    message: routeResult.alerts.notFound
      ? routeResult.alerts.notFound
      : "Błąd 404: Nie znaleziono zawartości",
    languageData: routeResult,
    languages: languagesResult,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
