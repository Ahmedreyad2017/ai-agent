import {Router} from 'express';
import {AuthController} from "../controllers/auth.controller";


export default function authRouter(authController: AuthController) {

    const router = Router();

    // @ts-ignore
    router.post('/register', async (req, res, next) => {
        try {

            return await authController.register(req, res);
        } catch (error) {
            next(error);
        }
    });
    // @ts-ignore
    router.post('/login', async (req, res, next) => {
        try {

            return await authController.login(req, res);
        } catch (error) {
            next(error);
        }
    });
    return router;
}
