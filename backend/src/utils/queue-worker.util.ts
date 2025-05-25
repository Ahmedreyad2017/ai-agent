import {Worker, Processor} from 'bullmq';
import {redis} from '../config/redis';

export function createWorker<T = any>(name: string, processor: Processor<T>) {
    return new Worker<T>(name, processor, {connection: redis})
}