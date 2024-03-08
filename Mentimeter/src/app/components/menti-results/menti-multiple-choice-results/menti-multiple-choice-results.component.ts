import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SocketService } from 'src/app/services/socket.service';
import { IRoomMultipleChoice } from 'src/app/types';

@Component({
  selector: 'app-menti-multiple-choice-results',
  templateUrl: './menti-multiple-choice-results.component.html',
  styleUrls: ['./menti-multiple-choice-results.component.css']
})
export class MentiMultipleChoiceResultsComponent {

  indexContent: number = 0;
  multipleChoice: IRoomMultipleChoice | undefined = undefined;
  private subscription?: Subscription;

  constructor(private dataService: DataService, private socketService: SocketService, private router: Router) {
    const dataMultipleChoice: IRoomMultipleChoice | undefined = this.dataService.roomMultipleChoice;
    if (dataMultipleChoice) {
      this.multipleChoice = dataMultipleChoice;
      this.socketService.connectSocket();
      this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
        const receivedMultipleChoice: IRoomMultipleChoice = JSON.parse(message[1])[1];
        if (message[0] === 'sendNewMultipleChoice' && receivedMultipleChoice.roomCode === this.multipleChoice?.roomCode) {
          const content = receivedMultipleChoice.content;
          if (this.multipleChoice) {
            this.multipleChoice.content = content;
          }
        }
      });
    }
  }

  ngAfterViewInit() {
    const background = document.querySelector('.menti-multiple-choice-results') as HTMLElement;
    background.style.backgroundImage = `url(assets/${this.dataService.background})`;
  }

  NextQuestion() {
    if (this.multipleChoice) {
      if (this.indexContent < this.multipleChoice.content.length - 1) {
        this.indexContent++;
      }
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

  closeSocket() {
    if (this.subscription && this.multipleChoice) {
      this.socketService.leaveRoom(this.multipleChoice.roomCode);
      this.socketService.closeSocket();
      this.router.navigate(['/createMenti']);
      this.dataService.roomMultipleChoice = undefined;
    }
  }
}
