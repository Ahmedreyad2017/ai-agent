'use client';

import {io, Socket} from "socket.io-client";
import {BASE_URL} from "@/constants";
import {useDialStore} from "@/stores/dial.store";
import {create} from "zustand";

interface SocketStore {
    socket: Socket | null;
    isConnected: boolean;
    initSocket: () => void;
    disconnectSocket: () => void;

}

export const useSocketStore = create<SocketStore>((set) => ({
    socket: null,
    isConnected: false,
    initSocket: () => {
        const socket = io(BASE_URL);

        socket.on("connect", () => {
            console.log("connected");
            set({
                isConnected: true
            })

        })
        socket.on("disconnect", () => {
            console.log("disconnected");
            set({
                isConnected: false
            })
        })
        socket.on('dial-updated', (data) => {
            useDialStore.getState().updateDial(data);
        })
        socket.on('dial-created', (data) => {
            useDialStore.getState().addDial(data);
        })
        set({
            socket: io(),
            isConnected: true
        })
    },
    disconnectSocket: () => {
        const socket = useSocketStore.getState().socket;
        if (socket) {
            socket.disconnect();
            set({socket: null, isConnected: false})
        }
    }
}))