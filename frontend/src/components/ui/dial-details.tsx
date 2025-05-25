'use client';

import React from "react";
import {useDialStore} from "@/stores/dial.store";

const Section = ({title, children}: { title: string; children: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">{title}</h2>
        {children}
    </div>
);

const DialDetailsPage = () => {
    const data = useDialStore((state) => state.selectedDial);

    return data ? (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <h1 className="text-4xl font-extrabold text-center text-gray-900">Dial Details</h1>

                <Section title="Session Info">
                    <p><strong className="text-gray-700">Session ID:</strong> {data.dial_session_id}</p>
                    <p><strong className="text-gray-700">Dial ID:</strong> {data.dial_id}</p>
                    <p><strong className="text-gray-700">Status:</strong> {data.status}</p>
                </Section>

                <Section title="Participants">
                    <p><strong className="text-gray-700">Source Number:</strong> {data.source_number}</p>
                    <p><strong className="text-gray-700">Destination Number ID:</strong> {data.dest_number_id}</p>
                    <p><strong className="text-gray-700">Call Agent ID:</strong> {data.call_agent_id}</p>
                </Section>

                <Section title="Timestamps">
                    <p><strong className="text-gray-700">Started At:</strong> {data.started_at?.toLocaleString()}</p>
                    <p><strong className="text-gray-700">Ended At:</strong> {data.ended_at?.toLocaleString()}</p>
                    <p><strong className="text-gray-700">Duration (s):</strong> {data.duration_seconds}</p>
                </Section>

                <Section title="Summary">
                    <p className="text-gray-700">{data.summary ?? "No summary available."}</p>
                </Section>

                <Section title="Transcript">
                    <ul className="space-y-3">
                        {data.transcript?.map((t, i) => (
                            <li key={i} className="bg-gray-50 border rounded px-4 py-2">
                                <span className="font-semibold text-blue-600">{t.speaker}:</span> {t.text}
                            </li>
                        ))}
                    </ul>
                </Section>

                {data.recording_url && (
                    <Section title="Recording">
                        <audio controls src={data.recording_url} className="w-full rounded ">
                            Your browser does not support the audio element.
                        </audio>
                    </Section>
                )}
            </div>
        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <p className="text-gray-500 text-lg">No dial selected.</p>
        </div>
    );
};

export default DialDetailsPage;