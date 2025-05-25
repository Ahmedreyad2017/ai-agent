import {DialEvents, DialStatus} from "../enums";
import {Optional} from "sequelize";

export type Transcript = {
    text: string;
    speaker: "AI" | "HUMAN";
}

export type DialAttributes = {
    dial_session_id: string;
    dial_id: string;
    dest_number_id: string;
    call_agent_id: string;
    source_number: string;
    status: DialStatus;
    summary: string | null;
    transcript: Transcript[];
    recording_id: string | null;
    recording_url: string | null;
    duration_seconds: number | null;
    ended_at: Date | null;
    started_at: Date | null,
    created_at: Date | null;
    updated_at: Date | null;

}


export type DialCreationAttributes = Optional<DialAttributes, "created_at" | "updated_at" | "transcript" | "recording_url" | "recording_id" | "started_at" | "ended_at" | "duration_seconds" | "summary" | "dest_number_id" | "call_agent_id" | "source_number">;

export type BaseDialPayload = {
    dial_id: string;
}

export type UpdateDialPayload = BaseDialPayload & {
    dial_session_id: string;
    status: DialStatus;
    duration_seconds?: number;
    ended_at?: Date;
    started_at?: Date;
}
export type CreateDialPayload = BaseDialPayload & {
    status: DialStatus;
    duration_seconds: number;
    dial_session_id: string;

}
export type TranscriptDialPayload = BaseDialPayload & {
    transcript: Transcript[];
}
export type ExtractorDialPayload = BaseDialPayload & {
    ai_result: {
        summary: string
    };
}
export type RecordingCreatedDialPayload = BaseDialPayload & {
    recorder_url: string;
    recording_id: string;
}

export type DialPayloadMap = {
    [DialEvents.DIAL_CREATED]: CreateDialPayload;
    [DialEvents.DIAL_INBOUND]: CreateDialPayload;
    [DialEvents.DIAL_UPDATED]: UpdateDialPayload;
    [DialEvents.DIAL_TRANSCRIPT]: TranscriptDialPayload;
    [DialEvents.DIAL_EXTRACTOR]: ExtractorDialPayload;
    [DialEvents.DIAL_RECORDING_CREATED]: RecordingCreatedDialPayload;
};
export type DialEventsUnion = keyof DialPayloadMap;

export type DialPayloadType<T extends DialEventsUnion> = DialPayloadMap[T];

export type HandlerMap = {
    [K in DialEventsUnion]: (payload: DialPayloadMap[K]) => any;
};
