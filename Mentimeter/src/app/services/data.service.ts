import { Injectable } from '@angular/core';
import { IRoomAnswerFeedback, IRoomAnswersBrainstorming, IRoomAnswersMultipleChoice, IRoomAnswersQuiz, IRoomBrainstorming, IRoomFeedback, IRoomMultipleChoice, IRoomQuiz } from '../types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  
  [key: string]: any;

  background: string = "background3.avif";

  backgrounds: string[] = [  "background1.avif",  "background2.avif",  "background3.avif",  "background4.avif" ];

  roomFeedback: IRoomFeedback | undefined = undefined;
  roomBrainstorming: IRoomBrainstorming | undefined = undefined;
  roomQuiz: IRoomQuiz | undefined = undefined;
  roomMultipleChoice: IRoomMultipleChoice | undefined = undefined;

  roomAnswer: IRoomAnswerFeedback | IRoomAnswersBrainstorming | IRoomAnswersMultipleChoice | IRoomAnswersQuiz | undefined = undefined;

  username: string | undefined = undefined;

  GenerateRoomCode(): string {
    const digits = '0123456789';
    let roomCode = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      roomCode += digits.charAt(randomIndex);
    }
    return roomCode;
  }
  
}
