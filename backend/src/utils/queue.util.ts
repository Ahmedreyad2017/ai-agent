import {Queue, QueueOptions} from "bullmq";
import {redis} from "../config/redis";

interface CreateQueueOptions<T = any> {
    name: string;
    options?: QueueOptions;
}

export function createQueue<T = any>({name, options}: CreateQueueOptions<T>) {
    return new Queue<T>(name, {
        connection: redis,

        ...options
    });
}