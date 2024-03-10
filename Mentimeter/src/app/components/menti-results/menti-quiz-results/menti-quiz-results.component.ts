import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SocketService } from 'src/app/services/socket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IRoomBrainstorming, IRoomQuiz } from 'src/app/types';

@Component({
  selector: 'app-menti-quiz-results',
  templateUrl: './menti-quiz-results.component.html',
  styleUrls: ['./menti-quiz-results.component.css']
})
export class MentiQuizResultsComponent {
  indexContent: number = 0;
  quiz: IRoomQuiz | undefined = undefined;
  private subscription?: Subscription;

  constructor(private dataService: DataService, private socketService: SocketService, private router: Router) {
    const dataQuiz: IRoomQuiz | undefined = this.dataService.roomQuiz;
    if (dataQuiz) {
      this.quiz = dataQuiz;
      this.socketService.connectSocket();

      this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
        const receivedQuiz: IRoomQuiz = JSON.parse(message[1])[1];
        if (message[0] === 'sendNewQuiz' && receivedQuiz.roomCode === this.quiz?.roomCode) {
          const content = receivedQuiz.content;
          if (this.quiz) {
            this.quiz.content = content;
          }
        }
      });
    }
  }

  ngAfterViewInit() {
    const background = document.querySelector('.menti-quiz-results') as HTMLElement;
    background.style.backgroundImage = `url(assets/${this.dataService.background})`;
  }

  NextQuestion() {
    if (this.quiz && this.indexContent < this.quiz.content.length - 1) {
      this.indexContent++;
      this.DesReveal()
    }
  }

  PreviousQuestion() {
    if (this.indexContent > 0) {
      this.indexContent--;
      this.DesReveal()
    }
  }

  Reveal() {
    const elementsTrue = document.querySelectorAll('.menti-quiz-results .reveal-true') as NodeListOf<HTMLElement>;
    const elementsFalse = document.querySelectorAll('.menti-quiz-results .reveal-false') as NodeListOf<HTMLElement>;
    elementsTrue.forEach((e: HTMLElement) => {
      e.style.backgroundColor = "rgb(47, 182, 47)";
    })
    elementsFalse.forEach((e: HTMLElement) => {
      e.style.backgroundColor = "rgb(255, 64, 64)";
    })
  }

  DesReveal() {
    const elementsTrue = document.querySelectorAll('.menti-quiz-results .reveal-true') as NodeListOf<HTMLElement>;
    const elementsFalse = document.querySelectorAll('.menti-quiz-results .reveal-false') as NodeListOf<HTMLElement>;
    elementsTrue.forEach((e: HTMLElement) => {
      e.style.backgroundColor = "transparent";
    })
    elementsFalse.forEach((e: HTMLElement) => {
      e.style.backgroundColor = "transparent";
    })
  }

  ngOnDestroy() {
    this.socketService.closeSocket();
  }

  CloseSocket() {
    if (this.subscription && this.quiz) {
      this.socketService.leaveRoom(this.quiz.roomCode);
      this.socketService.closeSocket();
      this.router.navigate(['/createMenti']);
      this.dataService.roomQuiz = undefined;
    }
  }
}
