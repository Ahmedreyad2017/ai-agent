'use client';
import {useDialStore} from "@/stores/dial.store";

import React, {FC, useEffect} from 'react';
import DialListItem from '@/components/ui/dial-list-item';

const DialList: FC = () => {
    const dials = useDialStore((state) => state.dials);
    const fetchDials = useDialStore(state => state.fetchDials);
    useEffect(() => {
        fetchDials();
        // eslint-disable-next-line
    }, []);
    console.log(dials);
    const dataList = Object.values(dials);


    return (
        <div className="space-y-4">
            {dataList.map((item) => (
                <DialListItem item={item} key={item.dial_id}/>
            ))}
        </div>
    );
};

export default DialList;
