import {DialStatus} from "@/enums";

export interface ITranscript {
    text: string;
    speaker: "AI" | "HUMAN";
}

export interface IDial {
    recording_url: string | null;
    duration_seconds: string | null;
    started_at: string | null;
    ended_at: string | null;
    dial_session_id: string;
    dial_id: string;
    dest_number_id: string;
    call_agent_id: string;
    source_number: string;
    status: DialStatus;
    summary: string | null;
    transcript: ITranscript[];
    recorder_url: string | null;

}