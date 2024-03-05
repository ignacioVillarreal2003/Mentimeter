import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SocketService } from 'src/app/services/socket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IBackground, IRoomFeedback } from 'src/app/types';

@Component({
  selector: 'app-menti-feedback-results',
  templateUrl: './menti-feedback-results.component.html',
  styleUrls: ['./menti-feedback-results.component.css']
})
export class MentiFeedbackResultsComponent {
  indexQuestion: number = 0;
  feedback: IRoomFeedback | undefined = undefined;
  private subscription?: Subscription;

  imageRoute = "../../../../assets";

  feed = [
    {
      image: "feed1.svg",
      index: 0
    }, 
    {
      image: "feed2.svg",
      index: 1
    }, 
    {
      image: "feed3.svg",
      index: 2
    }, 
    {
      image: "feed4.svg",
      index: 3
    }, 
    {
      image: "feed5.svg",
      index: 4
    }, 
  ]

  constructor(private dataService: DataService, private socketService: SocketService, private router: Router) { }

  ngOnInit() {
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
    this.ChangeTheme();
  }

  ChangeTheme() {
    const texto1 = document.querySelector('.menti-feedback-results h1') as HTMLElement;
    const texto2 = document.querySelector('.menti-feedback-results .question') as HTMLElement;
    const texto3 = document.querySelectorAll('.menti-feedback-results .vote') as NodeListOf<HTMLElement>;
    const background = document.querySelector('.menti-feedback-results') as HTMLElement;
    const controls = document.querySelectorAll('.menti-feedback-results .controls button') as NodeListOf<HTMLElement>;

    let color: string = "black"; 
    this.dataService.backgrounds.forEach((e: IBackground) => {
      if (e.background == this.dataService.background){
        color = e.color;
      }
    })

    texto1.style.color = color;
    texto2.style.color = color;
    texto3.forEach((e) => {
      e.style.color = color;
    })
    background.style.backgroundImage = `url(${this.imageRoute}/${this.dataService.background})`;
    if (color == "white") {
      controls.forEach((e) => {
        e.style.filter = "invert(100%)";
      })
    }
  }

  NextQuestion() {
    if (this.feedback) {
      if (this.indexQuestion < this.feedback.content.length - 1) {
        this.indexQuestion++;
      }
    }
  }

  PreviousQuestion() {
    if (this.indexQuestion > 0) {
      this.indexQuestion--;
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
