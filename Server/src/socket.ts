import { createServer } from 'http';
const rooms = require('./database/rooms');
import { app } from '.';
import { IRoomBrainstorming, IRoomFeedback, IRoomMultipleChoice, IRoomQuiz } from './types';

const SOCKET_PORT = 3002;

const httpServer = createServer(app);
const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});
httpServer.listen(SOCKET_PORT);

io.on('connection', (socket: any) => {
    console.log('user ' + socket.id.substr(0, 2) + ' connected');

    socket.on('disconnect', () => {
        console.log('user ' + socket.id.substr(0, 2) + ' disconnected!');
    });

    socket.on('joinRoom', (roomCode: string) => {
        socket.join(roomCode);
        console.log(`Usuario ${socket.id.substr(0, 2)} se unió a la sala ${roomCode}`);
    });

    socket.on('leaveRoom', (roomCode: string) => {
        socket.leave(roomCode);
        console.log(`Usuario ${socket.id.substr(0, 2)} se fue de la sala ${roomCode}`);
    });
});

export async function sendNewFeedback(roomCode: string) {
    try {
        const room: IRoomFeedback = await rooms.getRoomFeedback(roomCode);
        if (room) {
            io.to(roomCode).emit('sendNewFeedback', [roomCode, room]);
        }
    } catch (error) {
        console.error(`Error processing new data: ${error}`);
    }
}

export async function sendNewMultipleChoice(roomCode: string) {
    try {
        const room: IRoomMultipleChoice = await rooms.getRoomMultipleChoice(roomCode);
        if (room) {
            io.to(roomCode).emit('sendNewMultipleChoice', [roomCode, room]);
        }
    } catch (error) {
        console.error(`Error processing new data: ${error}`);
    }
}

export async function sendNewBrainstorming(roomCode: string) {
    try {
        const room: IRoomBrainstorming = await rooms.getRoomBrainstorming(roomCode);
        if (room) {
            io.to(roomCode).emit('sendNewBrainstorming', [roomCode, room]);
        }
    } catch (error) {
        console.error(`Error processing new data: ${error}`);
    }
}

export async function sendNewQuiz(roomCode: string) {
    try {
        const room: IRoomQuiz = await rooms.getRoomQuiz(roomCode);
        if (room) {
            io.to(roomCode).emit('sendNewQuiz', [roomCode, room]);
        }
    } catch (error) {
        console.error(`Error processing new data: ${error}`);
    }
}