import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";
import { findAdminCode, findOneUserByLogin } from "../assets/queries";

type Role = "user" | "admin";

interface TokenData extends JwtPayload {
  _id: ObjectId;
  login: string;
  role: Role;
}

export interface RequestLogin extends Request {
  _id?: ObjectId;
  login?: string;
  role?: Role;
}

const accessTokenExpiry: number = 1000 * 60 * 60;
const refreshTokenExpiry: number = 1000 * 60 * 60 * 24 * 30;

export const checkAuth = async (
  req: RequestLogin,
  res: Response,
  next: NextFunction
) => {
  let accessToken: string = req.cookies.access_token_lingo;
  let refreshToken: string = req.cookies.refresh_token_lingo;

  console.log(accessToken);

  if (!process.env.REFRESH_TOKEN_SECRET || !process.env.ACCESS_TOKEN_SECRET)
    return res.status(500).send("Coś poszło nie tak po naszej stronie");

  if (!refreshToken) {
    res.clearCookie("access_token_lingo");
    return res.status(401).send("Nieautoryzowany");
  } else if (!accessToken && refreshToken) {
    const refreshTokenVerify = <TokenData>(
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    );

    accessToken = jwt.sign(
      {
        _id: refreshTokenVerify._id,
        login: refreshTokenVerify.login,
        role: refreshTokenVerify.role,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.cookie("access_token_lingo", accessToken, {
      httpOnly: true,
      maxAge: accessTokenExpiry,
      sameSite: "strict",
    });
  }

  try {
    const userVerify = <TokenData>(
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    );
    const result = await findOneUserByLogin(userVerify.login);
    if (!result) {
      res.clearCookie("access_token_lingo");
      res.clearCookie("refresh_token_lingo");
      return res.status(404).send("Nie znaleziono użytkownika");
    }
    req._id = userVerify._id;
    req.login = userVerify.login;
    req.role = userVerify.role;
    console.log(req.login);
    next();
  } catch (error) {
    res.status(401).send("Nieprawidłowy token");
  }
};

export const isAuthenticated = async (
  req: RequestLogin,
  res: Response,
  next: NextFunction
) => {
  let accessToken: string = req.cookies.access_token_lingo;
  let refreshToken: string = req.cookies.refresh_token_lingo;

  if (!process.env.REFRESH_TOKEN_SECRET || !process.env.ACCESS_TOKEN_SECRET)
    return res.status(500).send("Coś poszło nie tak po naszej stronie");

  if (refreshToken) {
    if (!accessToken) {
      console.log(`!accessToken`);
      const refreshTokenVerify = <TokenData>(
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      );

      accessToken = jwt.sign(
        {
          _id: refreshTokenVerify._id,
          login: refreshTokenVerify.login,
          role: refreshTokenVerify.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: accessTokenExpiry }
      );
      res.cookie("access_token_lingo", accessToken, {
        httpOnly: true,
        maxAge: accessTokenExpiry,
        sameSite: "strict",
      });
      const userVerify = <TokenData>(
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      );
      const result = await findOneUserByLogin(userVerify.login);
      if (!result) {
        res.clearCookie("access_token_lingo");
        res.clearCookie("refresh_token_lingo");
        return res.status(404).send("Nie znaleziono użytkownika");
      }
      req._id = userVerify._id;
      req.login = userVerify.login;
      req.role = userVerify.role;
    } else if (accessToken) {
      const userVerify = <TokenData>(
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      );
      const result = await findOneUserByLogin(userVerify.login);
      if (!result) {
        res.clearCookie("access_token_lingo");
        res.clearCookie("refresh_token_lingo");
        return res.status(404).send("Nie znaleziono użytkownika");
      }
      req._id = userVerify._id;
      req.login = userVerify.login;
      req.role = userVerify.role;
    }
    next();
  } else {
    res.clearCookie("access_token_lingo");
    next();
  }
};

export const isAdmin = async (
  req: RequestLogin,
  res: Response,
  next: NextFunction
) => {
  const role = req.role;
  if (!role) {
    return res
      .status(500)
      .send({ message: "Coś poszło nie tak po naszej stronie" });
  }
  if (role !== "admin") {
    return res
      .status(403)
      .send({ message: "Brak uprawnień do wyświetlenia zawartości" });
  }
  if (role === "admin") {
    next();
  }
};

export const isAdminWithCode = async (
  req: RequestLogin,
  res: Response,
  next: NextFunction
) => {
  const role = req.role;
  if (!role) {
    return res
      .status(500)
      .send({ message: "Coś poszło nie tak po naszej stronie" });
  }
  if (role !== "admin") {
    return res
      .status(403)
      .send({ message: "Brak uprawnień do wyświetlenia zawartości" });
  }
  if (role === "admin") {
    if (!process.env.ADMIN_TOKEN_SECRET) {
      return res
        .status(500)
        .send({ message: "Weryfikacja uprawnień nie powiodła się" });
    }

    const adminToken = req.cookies.admin_token_lingo;
    if (!adminToken)
      return res.status(403).send({ message: "Nieprawidłowy token" });

    const adminVerify = <TokenData>(
      jwt.verify(adminToken, process.env.ADMIN_TOKEN_SECRET)
    );
    const adminCodeResult = await findAdminCode(
      adminVerify._id,
      adminVerify.code
    );
    if (!adminCodeResult)
      return res.status(404).send({ message: "Nie znaleziono użytkownika" });
  }

  next();
};
