import {NextFunction, Request, RequestHandler, Response} from "express";
import {sessionConfig} from "../config/session";

export function conditionalSessionMiddleWare(req: Request, res: Response, next: NextFunction
) {
    const skipPaths = ["/webhook"];
    if (skipPaths.some(path => req.url.includes(path)))
        return next();
    // @ts-ignore
    return sessionConfig(req, res, next);
}