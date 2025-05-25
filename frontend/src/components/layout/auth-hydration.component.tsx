'use client';

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useSocketStore} from "@/stores/socket.store";
import {useAuthStore} from "@/stores/auth.store";

export const AuthHydration = () => {
    const initSocket = useSocketStore.getState().initSocket;
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    const setAuthenticated = useAuthStore.getState().setAuthenticated;
    const router = useRouter();

    useEffect(() => {
        const sessionId = localStorage.getItem("sessionId");
        if (sessionId) {
            setAuthenticated(true, sessionId);
            initSocket();
            router.push('/dashboard/dials');
        } else {
            setAuthenticated(false, null);
            router.push('/login');
            return;
        }
    }, [initSocket, isAuthenticated, router, setAuthenticated]);

    return null;
};
