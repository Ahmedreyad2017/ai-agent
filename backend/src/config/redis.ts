import Redis from 'ioredis';
import {REDIS_HOST, REDIS_PORT} from "../constants";

export const redis = new Redis(
        REDIS_PORT,
        REDIS_HOST || 'localhost', {
            maxRetriesPerRequest: null
        }
    )
;