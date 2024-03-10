import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SocketService } from 'src/app/services/socket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IRoomBrainstorming } from 'src/app/types';

@Component({
  selector: 'app-menti-brainstorming-results',
  templateUrl: './menti-brainstorming-results.component.html',
  styleUrls: ['./menti-brainstorming-results.component.css']
})
export class MentiBrainstormingResultsComponent {
  indexContent: number = 0;
  brainstorming: IRoomBrainstorming | undefined = undefined;
  private subscription?: Subscription;

  constructor(private dataService: DataService, private socketService: SocketService, private router: Router) {
    const dataBrainstorming: IRoomBrainstorming | undefined = this.dataService.roomBrainstorming;
    if (dataBrainstorming) {
      this.brainstorming = dataBrainstorming;
      this.socketService.connectSocket();

      this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
        console.log(JSON.parse(message[1])[1]);
        
        const receivedBrainstorming: IRoomBrainstorming = JSON.parse(message[1])[1];
        if (message[0] === 'sendNewBrainstorming' && receivedBrainstorming.roomCode === this.brainstorming?.roomCode) {
          const content = receivedBrainstorming.content;
          if (this.brainstorming) {
            this.brainstorming.content = content;
          }
        }
      });
    }
  }

  ngAfterViewInit() {
    const background = document.querySelector('.menti-brainstorming-results') as HTMLElement;
    background.style.backgroundImage = `url(assets/${this.dataService.background})`;
  }

  NextQuestion() {
    if (this.brainstorming && this.indexContent < this.brainstorming.content.length - 1) {
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
    if (this.subscription && this.brainstorming) {
      this.socketService.leaveRoom(this.brainstorming.roomCode);
      this.socketService.closeSocket();
      this.router.navigate(['/createMenti']);
      this.dataService.roomBrainstorming = undefined;
    }
  }
}
