import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { IRoomAnswerFeedback, IRoomFeedback } from 'src/app/types';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrls: ['./feedback-view.component.css']
})
export class FeedbackViewComponent {

  feedback: IRoomFeedback | undefined = undefined;
  indexContent: number = 0;
  isRate: boolean = false;

  feed = [
    { image: "feed1.svg", indexRate: 0 },
    { image: "feed2.svg", indexRate: 1 },
    { image: "feed3.svg", indexRate: 2 },
    { image: "feed4.svg", indexRate: 3 },
    { image: "feed5.svg", indexRate: 4 },
  ]

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    const dataFeedback: IRoomFeedback | undefined = this.dataService.roomFeedback;
    if (dataFeedback != undefined) {
      this.feedback = dataFeedback;
    }
  }

  DoRate(n: number) {
    if (this.feedback) {
      const rating: [number, number, number, number, number] = [0, 0, 0, 0, 0];
      rating[n] = 1;
      this.feedback.content[this.indexContent].rating = rating;
      this.isRate = true;
    }
  }

  NextQuestion() {
    if (this.feedback != undefined) {
      if (this.isRate) {
        if (this.indexContent < this.feedback.content.length - 1) {
          this.PostFeedback();
          this.indexContent++;
          this.ClearColor();
          this.isRate = false;
        } else if (this.indexContent == this.feedback.content.length - 1) {
          this.PostFeedback();
          this.router.navigate(['/mentiEnd']);
          this.isRate = false;
        } else {
          this.GetError("Select an option.");
        }
      } else {
        this.GetError("Select an option.");
      }
    } else {
      this.GetError("Error in feedback.");
    }
  }

  PostFeedback() {
    if (this.feedback != undefined) {
      const feedbackResult: IRoomAnswerFeedback = {
        roomCode: this.feedback.roomCode,
        content: this.feedback.content[this.indexContent]
      }
      this.httpService.PostRoomAnswersFeedback(feedbackResult).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          this.GetError(error);
          console.log(error);
        }
      );
    }
  }

  GetError(error: string) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
      timer: 2000,
      timerProgressBar: true
    });
  }

  ChangeColor(color: number) {
    const buttons = document.querySelectorAll('.feedback-view .shape') as NodeListOf<HTMLElement>;
    buttons.forEach((e) => {
      e.style.backgroundColor = "white";
    })
    if (color >= 0 && color < buttons.length) {
      buttons[color].style.backgroundColor = this.getBackgroundColorByIndex(color);
    }
  }

  ClearColor() {
    const buttons = document.querySelectorAll('.feedback-view .vote') as NodeListOf<HTMLElement>;
    buttons.forEach((e) => {
      e.style.backgroundColor = "white";
    })
  }

  private getBackgroundColorByIndex(index: number): string {
    const colorMap = ["#FF6868", "#ffa578", "#FBA834", "#79db68", "#65B741"];
    return colorMap[index] || "white";
  }
}
