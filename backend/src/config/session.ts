import session from 'express-session';
import {SECRET} from "../constants";
import {RequestHandler} from "express";

export const sessionConfig:RequestHandler = session({
    secret: SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
});