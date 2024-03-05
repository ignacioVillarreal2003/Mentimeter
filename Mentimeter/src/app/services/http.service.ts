import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { IRoomAnswerFeedback, IRoomAnswersBrainstorming, IRoomAnswersMultipleChoice, IRoomAnswersQuiz, IRoomBrainstorming, IRoomFeedback, IRoomMultipleChoice, IRoomQuiz, IUser } from '../types';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      console.log(`Error: ${error.status} ${error.error.message}`);
      errorMessage = error.error.message;
    } else if (error.status) {
      console.log(`Error: ${error.status} ${error.error.message}`);
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }

  /* Section startup methods */
  Register(username: string, password: string): Observable<any> {
    const requestBody: IUser = {
      username: username,
      password: password
    };
    return this.http.post<any>('http://localhost:3001/session/registerUser', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.token) {
          return response.token;
        }
        return null;
      })
    );
  }

  Login(username: string, password: string): Observable<any> {
    const requestBody: IUser = {
      username: username,
      password: password
    };
    return this.http.post<any>('http://localhost:3001/session/loginUser', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.token) {
          return response.token;
        }
        return null;
      })
    );
  }

  ChangePassword(username: string, password: string, newPassword: string): Observable<any> {
    const requestBody = {
      username: username,
      password: password,
      newPassword: newPassword
    };
    return this.http.post<any>('http://localhost:3001/session/changePassword', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  /* Room methods */
  GetRoom(roomCode: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/room/getRoom/${roomCode}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.room) {
          const room: IRoomFeedback = response.room;
          return room;
        }
        return null;
      })
    );
  }

  GetRoomFeedback(roomCode: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/room/getRoomFeedback/${roomCode}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.room) {
          const room: IRoomFeedback = response.room;
          return room;
        }
        return null;
      })
    );
  }

  PostRoomFeedback(room: IRoomFeedback): Observable<any> {
    const requestBody: IRoomFeedback = room;
    return this.http.post<any>('http://localhost:3001/room/postRoomFeedback', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  PostRoomAnswersFeedback(roomAnswers: IRoomAnswerFeedback): Observable<any> {
    const requestBody: IRoomAnswerFeedback = roomAnswers;
    return this.http.post<any>('http://localhost:3001/room/postRoomAnswersFeedback', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetRoomMultipleChoice(roomCode: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/room/getRoomMultipleChoice/${roomCode}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.room) {
          const room: IRoomMultipleChoice = response.room;
          return room;
        }
        return null;
      })
    );
  }

  PostRoomMultipleChoice(room: IRoomMultipleChoice): Observable<any> {    
    const requestBody: IRoomMultipleChoice = room;
    return this.http.post<any>('http://localhost:3001/room/postRoomMultipleChoice', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  PostRoomAnswersMultipleChoice(roomAnswers: IRoomAnswersMultipleChoice): Observable<any> {
    const requestBody: IRoomAnswersMultipleChoice = roomAnswers;
    return this.http.post<any>('http://localhost:3001/room/postRoomAnswersMultipleChoice', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetRoomBrainstorming(roomCode: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/room/getRoomBrainstorming/${roomCode}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.room) {
          const room: IRoomMultipleChoice = response.room;
          return room;
        }
        return null;
      })
    );
  }

  PostRoomBrainstorming(room: IRoomBrainstorming): Observable<any> {
    const requestBody: IRoomBrainstorming = room;
    return this.http.post<any>('http://localhost:3001/room/postRoomBrainstorming', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  PostRoomAnswersBrainstorming(roomAnswers: IRoomAnswersBrainstorming): Observable<any> {
    const requestBody: IRoomAnswersBrainstorming = roomAnswers;
    return this.http.post<any>('http://localhost:3001/room/postRoomAnswersBrainstorming', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetRoomQuiz(roomCode: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/room/getRoomQuiz/${roomCode}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.room) {
          const room: IRoomQuiz = response.room;
          return room;
        }
        return null;
      })
    );
  }

  PostRoomQuiz(room: IRoomQuiz): Observable<any> {
    const requestBody: IRoomQuiz = room;
    return this.http.post<any>('http://localhost:3001/room/postRoomQuiz', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  PostRoomAnswersQuiz(roomAnswers: IRoomAnswersQuiz): Observable<any> {
    const requestBody: IRoomAnswersQuiz = roomAnswers;
    return this.http.post<any>('http://localhost:3001/room/postRoomAnswersQuiz', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
