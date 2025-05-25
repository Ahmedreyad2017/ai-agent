import {redis} from "../config/redis";
import {createQueue} from "../utils/queue.util";
import {DialEvents} from "../enums";
import {Queue} from "bullmq";
import {DialService} from "../services/dial.service";
import {createWorker} from "../utils/queue-worker.util";


export class DialQueue {
    public readonly queue: Queue<{ event: DialEvents; payload: any; seq: number }>;

    constructor(private readonly dialService: DialService) {
        this.queue = createQueue<{ event: DialEvents; payload: any; seq: number }>({
            name: 'dial-updates',
            options: {
                connection: redis,
            }
        })
        this.registerWorker();


    }

    registerWorker() {
        createWorker('dial-updates', async (job) => {
                try {
                    const {event, payload, seq} = job.data;
                    const lastSeq = parseInt(await redis.get(`dial:${payload.dial_id}:seq`) || '0', 10);
                    console.log('received event: ', event, ' seq: ', seq, ' lastSeq: ', lastSeq, ' payload: ', payload, '')
                    if (seq < lastSeq) {
                        return;
                    }
                    await this.dialService.routeDialEvent(event, payload);
                }
                catch (err) {
                    throw err;
                }
            }
        )


    }

    async add(jobName: string, data: any) {
        const seq = await redis.incr(`dial:${data.payload.dial_id}:seq`);

        return await this.queue.add(jobName, {...data, seq}, {
            jobId: `${jobName}-${data.payload.dial_id}-${Date.now()}`,
        });
    }
}
