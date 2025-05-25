import {Router} from 'express';
import {DialController} from '../controllers/dial.controller';
import verifyWebhookMiddleware from "../middleware/hmac.middleware";
import {WEBHOOK_SIGNING_SECRET} from "../constants";


export default function dialRouter(dialController: DialController) {

    const router = Router();
    //@ts-ignore
    router.use('/webhook', verifyWebhookMiddleware(WEBHOOK_SIGNING_SECRET))

    // @ts-ignore
    router.get('/', async (req, res, next) => {
        try {
            return await dialController.getAllDials(req, res);
        } catch (error) {
            next(error);
        }
    });
    //@ts-ignore

    // @ts-ignore
    router.post('/webhook', async (req, res, next) => {
        try {
            return await dialController.receiveWebhook(req, res);
        } catch (error) {
            next(error);
        }
    });
    return router;
}
