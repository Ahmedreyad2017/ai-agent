import express from 'express';
import { DialService } from "../services/dial.service";
import { type Dial } from "../models/dial.model";
import { DialQueue } from "../queues/dial.queue";

export class DialController {
    constructor(
        private readonly dialService: DialService,
        private readonly dialQueue: DialQueue
    ) {}

    getAllDials = async (req: express.Request, res: express.Response) => {
        try {
            const dials: Dial[] = await this.dialService.findAll();
            return res.json(dials);
        } catch (err: any) {
            console.error("Error fetching all dials:", err);
            return res.status(500).json({
                message: "Failed to retrieve dials.",
                details: err?.message || "Internal server error",
            });
        }
    };

    receiveWebhook = async (req: express.Request, res: express.Response) => {
        try {
            const { event, payload } = req.body;

            if (!event || !payload) {
                return res.status(400).json({
                    message: "Missing 'event' or 'payload' in request body",
                });
            }

            const job = await this.dialQueue.add('dial-updates', { event, payload });

            return res.status(201).json(job.asJSON());

        } catch (err: any) {
            console.error("Error receiving webhook:", err);
            return res.status(500).json({
                message: "Failed to process webhook.",
                details: err?.message || "Internal server error",
            });
        }
    };
}
