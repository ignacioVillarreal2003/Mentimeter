import { Injectable } from '@angular/core';
import { IBackground, IRoomAnswerFeedback, IRoomAnswersBrainstorming, IRoomAnswersMultipleChoice, IRoomAnswersQuiz, IRoomBrainstorming, IRoomFeedback, IRoomMultipleChoice, IRoomQuiz } from '../types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  
  [key: string]: any;

  background: string = "background3.avif";
  backgrounds: IBackground[] = [
    {
      background: "background1.avif",
      color: "white"
    },
    {
      background: "background2.avif",
      color: "black"
    },
    {
      background: "background3.avif",
      color: "black"
    },
    {
      background: "background4.avif",
      color: "black"
    },
    {
      background: "background5.avif",
      color: "white"
    },
    {
      background: "background6.avif",
      color: "white"
    },
    {
      background: "background7.avif",
      color: "black"
    }
  ]

  roomFeedback: IRoomFeedback | undefined = undefined;
  roomBrainstorming: IRoomBrainstorming | undefined = undefined;
  roomQuiz: IRoomQuiz | undefined = undefined;
  roomMultipleChoice: IRoomMultipleChoice | undefined = undefined;

  roomAnswer:IRoomAnswerFeedback | IRoomAnswersBrainstorming | IRoomAnswersMultipleChoice | IRoomAnswersQuiz| undefined = undefined
  
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
