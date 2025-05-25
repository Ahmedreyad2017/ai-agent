import {Server as IOServer} from "socket.io";
import http from "http";


let io: IOServer;

export function initWebSocket(server: http.Server) {
    io = new IOServer(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
        socket.join('dial-updates');

    })
    return io;
}

export function getIO(): IOServer {
    if (!io) throw new Error('Socket Server not initialized');
    return io;
}