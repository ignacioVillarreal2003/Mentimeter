import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SocketService } from 'src/app/services/socket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IRoomFeedback } from 'src/app/types';

@Component({
  selector: 'app-menti-feedback-results',
  templateUrl: './menti-feedback-results.component.html',
  styleUrls: ['./menti-feedback-results.component.css']
})
export class MentiFeedbackResultsComponent {

  indexContent: number = 0;
  feedback: IRoomFeedback | undefined = undefined;
  private subscription?: Subscription;

  feedContent = [
    { image: "feed1.svg", index: 0 },
    { image: "feed2.svg", index: 1 },
    { image: "feed3.svg", index: 2 },
    { image: "feed4.svg", index: 3 },
    { image: "feed5.svg", index: 4 },
  ]

  constructor(private dataService: DataService, private socketService: SocketService, private router: Router) {
    const dataFeedback: IRoomFeedback | undefined = this.dataService.roomFeedback;
    if (dataFeedback) {
      this.feedback = dataFeedback;
      this.socketService.connectSocket();

      this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
        const receivedFeedback: IRoomFeedback = JSON.parse(message[1])[1];
        if (message[0] === 'sendNewFeedback' && receivedFeedback.roomCode === this.feedback?.roomCode) {
          const content = receivedFeedback.content;
          if (this.feedback) {
            this.feedback.content = content;
          }
        }
      });
    }
  }

  ngAfterViewInit() {
    const background = document.querySelector('.menti-feedback-results') as HTMLElement;
    background.style.backgroundImage = `url(assets/${this.dataService.background})`;
  }

  NextQuestion() {
    if (this.feedback && this.indexContent < this.feedback.content.length - 1) {
      this.indexContent++;
    }
  }

  PreviousQuestion() {
    if (this.indexContent > 0) {
      this.indexContent--;
    }
  }

  ngOnDestroy() {
    this.socketService.closeSocket();
  }

  CloseSocket() {
    if (this.subscription && this.feedback) {
      this.socketService.leaveRoom(this.feedback.roomCode);
      this.socketService.closeSocket();
      this.router.navigate(['/createMenti']);
      this.dataService.roomFeedback = undefined;
    }
  }
}
