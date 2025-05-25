import { WithImplicitCoercion } from 'buffer';
import crypto from 'crypto';

export function verifyWebhook(
    payload: WithImplicitCoercion<string>,
    signature: WithImplicitCoercion<string>,
    signingSecret: crypto.BinaryLike | crypto.KeyObject,
    algorithm = 'sha256'
) {
    // Convert payload to buffer if not already
    const buf = Buffer.isBuffer(payload) ? payload : Buffer.from(payload, 'utf8');

    // Convert signature from hex string to buffer
    const sig = Buffer.from(signature, 'hex');

    // Create HMAC with secret
    const hmac = crypto.createHmac(algorithm, signingSecret);

    // Calculate digest of payload
    const digest = Buffer.from(hmac.update(buf).digest('hex'), 'hex');
    // Compare calculated digest with provided signature
    if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
        throw new Error('Invalid webhook signature');
    }

    return true;
}