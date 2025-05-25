import crypto from 'crypto';
import {Request, Response, NextFunction} from "express";
import {verifyWebhook} from "../utils/hmac.utils";

function verifyWebhookMiddleware(
    signingSecret: crypto.BinaryLike | crypto.KeyObject,
    signatureHeaderName = 'x-elto-signature',
    algorithm = 'sha256'
) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const rawBody = (req as any).rawBody;
            const signature = req.header(signatureHeaderName);
            if (!rawBody || !signature) {
                return res.status(400).send('Missing payload or signature');
            }

            verifyWebhook(rawBody, signature, signingSecret, algorithm);

            next(); // Signature is valid
        } catch (err) {
            console.error('Webhook verification failed:', err);
            return res.status(401).send('Invalid webhook signature');
        }
    };
}

export default verifyWebhookMiddleware;