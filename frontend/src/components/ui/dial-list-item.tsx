'use client'
import React, {FC} from 'react';
import {IDial} from '@/types/dial.interface';
import Link from 'next/link';
import {DialStatus} from "@/enums";
import {useDialStore} from "@/stores/dial.store";

const statusColors: Record<DialStatus, string> = {
    [DialStatus.BUSY]: 'bg-yellow-100 text-yellow-800',
    [DialStatus.FAILED]: 'bg-red-100 text-red-800',
    [DialStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800 animate-pulse',
    [DialStatus.CANCELED]: 'bg-red-100 text-red-800',
    [DialStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [DialStatus.NO_ANSWER]: 'bg-red-100 text-red-800',
    [DialStatus.QUEUED]: 'bg-gray-100 text-gray-800',
    [DialStatus.RINGING]: 'bg-gray-100 text-gray-800 animate-pulse'
};

const DialListItem: FC<{ item: IDial }> = ({item}) => {

    const setSelectedDial = useDialStore(state => state.setSelectedDial)

    const {
        recorder_url,
        dial_id,
        dial_session_id,
        call_agent_id,
        status,
        source_number,
    } = item;

    return (
        <div onClick={() => setSelectedDial(item.dial_id)}
             className="block p-4 border border-gray-200 rounded-2xl hover:shadow-md transition bg-white space-y-1"
        >
            <div className="flex items-center justify-between">
        <span className="font-semibold text-lg text-gray-800">
          📞 {source_number}
        </span>
                <span
                    className={
                        `px-2 py-1 text-sm rounded-md font-medium
                        ${statusColors[status] || 'bg-gray-100 text-gray-700'}`
                    }
                >
          {status}
        </span>
            </div>

            <div className="text-sm text-gray-500">
                <div>
                    <span className="font-medium text-gray-600">Agent:</span>{' '}
                    {call_agent_id}
                </div>
                <div>
                    <span className="font-medium text-gray-600">Session:</span>{' '}
                    {dial_session_id}
                </div>
            </div>

            {/*{recorder_url && (*/}
            {/*    <div className="mt-2">*/}
            {/*        <audio controls className="w-full">*/}
            {/*            <source src={recorder_url} type="audio/mpeg"/>*/}
            {/*            Your browser does not support the audio element.*/}
            {/*        </audio>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default DialListItem;
