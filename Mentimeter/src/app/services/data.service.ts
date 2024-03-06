import { Injectable } from '@angular/core';
import { IRoomAnswerFeedback, IRoomAnswersBrainstorming, IRoomAnswersMultipleChoice, IRoomAnswersQuiz, IRoomBrainstorming, IRoomFeedback, IRoomMultipleChoice, IRoomQuiz } from '../types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  
  [key: string]: any;

  // Propiedad para almacenar la imagen de fondo actual
  background: string = "background3.avif";

  // Lista de fondos disponibles con su respectivo color
  backgrounds: string[] = [  "background1.avif",  "background2.avif",  "background3.avif",  "background4.avif" ];

  // Propiedades para almacenar información de las diferentes salas
  roomFeedback: IRoomFeedback | undefined = undefined;
  roomBrainstorming: IRoomBrainstorming | undefined = undefined;
  roomQuiz: IRoomQuiz | undefined = undefined;
  roomMultipleChoice: IRoomMultipleChoice | undefined = undefined;

  // Propiedad para almacenar la respuesta de una sala específica
  roomAnswer: IRoomAnswerFeedback | IRoomAnswersBrainstorming | IRoomAnswersMultipleChoice | IRoomAnswersQuiz | undefined = undefined;

  // Propiedad para almacenar el nombre de usuario
  username: string | undefined = undefined;

  // Método para generar un código de sala aleatorio
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
