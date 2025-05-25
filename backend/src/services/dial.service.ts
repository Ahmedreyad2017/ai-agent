import { DialRepo } from "../repositories/dial.repo";
import {
    DialCreationAttributes,
    DialEventsUnion,
    DialPayloadMap,
    DialPayloadType,
    HandlerMap,
} from "../types";
import { DialEvents } from "../enums";
import { getIO } from "../utils/websocket.util";
import { EmailService } from "./email.service";
import container from "../config/awilix";

export class DialService {
    constructor(private readonly dialRepo: DialRepo) {}

    //@ts-ignore
    handlers: HandlerMap = {
        [DialEvents.DIAL_CREATED]: async (payload) => this.create(payload),
        [DialEvents.DIAL_INBOUND]: async (payload) => this.create(payload),
        [DialEvents.DIAL_UPDATED]: async (payload) => this.update(payload),
        [DialEvents.DIAL_TRANSCRIPT]: async (payload) => this.update(payload),
        [DialEvents.DIAL_EXTRACTOR]: async (payload) => this.update(payload),
        [DialEvents.DIAL_RECORDING_CREATED]: async (payload) => this.dialCompleted(payload),
    };

    async routeDialEvent<T extends DialEventsUnion>(
        event: T,
        payload: DialPayloadMap[T]
    ) {
        try {
            const handler = this.handlers[event];
            if (!handler) {
                throw new Error(`No handler defined for event: ${event}`);
            }
            return await handler(payload);
        } catch (error) {
            console.error(`Error routing dial event ${event}:`, error);
            throw error;
        }
    }

    async findAll(options?: any) {
        try {
            return await this.dialRepo.findAll({ order: [["updated_at", "DESC"]], ...options });
        } catch (error) {
            console.error("Error fetching dials:", error);
            throw error;
        }
    }

    async create(dial: DialCreationAttributes) {
        try {
            const created = await this.dialRepo.create(dial);
            try {
                getIO().to('dial-updates').emit('dial-created', created);
            } catch (emitError) {
                console.warn("Error emitting dial-created event:", emitError);
            }
            return created;
        } catch (error) {
            console.error("Error creating dial:", error);
            throw error;
        }
    }

    async update<T extends keyof DialPayloadMap>(dial: DialPayloadType<T>) {
        try {
            const { dial_id, ...payload } = dial;
            const updated = await this.dialRepo.update(payload, {
                where: { dial_id },
                returning: true,
            });

            if (!updated[1]?.length) {
                throw new Error(`Dial with id ${dial_id} not found or not updated.`);
            }

            try {
                getIO().to('dial-updates').emit('dial-updated', updated[1][0]);
            } catch (emitError) {
                console.warn("Error emitting dial-updated event:", emitError);
            }

            return updated[1][0];
        } catch (error) {
            console.error("Error updating dial:", error);
            throw error;
        }
    }

    async dialCompleted<T extends keyof DialPayloadMap>(dial: DialPayloadType<T>) {
        try {
            const emailService = await container.resolve<Promise<EmailService>>('emailService');
            const { dial_id } = dial;

            await this.update(dial);

            await emailService.sendEmail({
                to: ["ahmedreyad2017@gmail.com","demo@plena.health"],
                subject: 'Dial Completed',
                html: `<p>Dial Completed with id: ${dial_id}</p>`,
            });

        } catch (error) {
            console.error("Error completing dial and sending email:", error);
            throw error;
        }
    }
}
