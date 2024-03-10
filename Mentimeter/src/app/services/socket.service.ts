import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { IRoomBrainstorming, IRoomFeedback, IRoomMultipleChoice, IRoomQuiz } from '../types';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket = io('http://localhost:3002');
  private message$: BehaviorSubject<string[]> = new BehaviorSubject(['']);

  constructor(private dataService: DataService) {
    this.initSocket();
  }

  private initSocket() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor de sockets');
      
      let roomCode = "";      
      if (this.dataService.roomFeedback){
        roomCode = this.dataService.roomFeedback.roomCode;      
      } else if (this.dataService.roomMultipleChoice){
        roomCode = this.dataService.roomMultipleChoice.roomCode;      
      } else if (this.dataService.roomBrainstorming){
        roomCode = this.dataService.roomBrainstorming.roomCode;      
      } else if (this.dataService.roomQuiz){
        roomCode = this.dataService.roomQuiz.roomCode;      
      }
      this.socket.emit('joinRoom', roomCode);
    });
  
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor de sockets');
    });
  
    this.socket.on('sendNewFeedback', (room: IRoomFeedback) => {
      this.message$.next(['sendNewFeedback', JSON.stringify(room)]);
    });

    this.socket.on('sendNewMultipleChoice', (room: IRoomMultipleChoice) => {
      this.message$.next(['sendNewMultipleChoice', JSON.stringify(room)]);
    });

    this.socket.on('sendNewBrainstorming', (room: IRoomBrainstorming) => {
      this.message$.next(['sendNewBrainstorming', JSON.stringify(room)]);
    });

    this.socket.on('sendNewQuiz', (room: IRoomQuiz) => {
      this.message$.next(['sendNewQuiz', JSON.stringify(room)]);
    });
  }
  

  public getNewMessage(): Observable<string[]> {
    return this.message$.asObservable();
  }

  public closeSocket() {
    this.socket.disconnect();
  }

  public leaveRoom(roomCode: string) {
    this.socket.emit('leaveRoom', roomCode);
  }

  public connectSocket() {
    setTimeout(() => {
      this.socket.connect();
    }, 1000);
  }
}

