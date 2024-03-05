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
  index: number = 0;
  isRate: boolean = false;

  imageRoute = "../../../../assets";

  feed = [
    {
      image: "feed1.svg",
      indexRate: 0
    }, 
    {
      image: "feed2.svg",
      indexRate: 1
    }, 
    {
      image: "feed3.svg",
      indexRate: 2
    }, 
    {
      image: "feed4.svg",
      indexRate: 3
    }, 
    {
      image: "feed5.svg",
      indexRate: 4
    }, 
  ]

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService){}

  ngOnInit(){
    const dataFeedback: IRoomFeedback | undefined = this.dataService.roomFeedback;
    if (dataFeedback != undefined){
      this.feedback = dataFeedback;
    }
  }

  DoRate(n: number){
    if (this.feedback){
      const rating: [number, number, number, number, number] = [0, 0, 0, 0, 0];
      rating[n] = 1;
      this.feedback.content[this.index].rating = rating;
      this.isRate = true;
    }
  }

  NextQuestion(){
    if (this.feedback != undefined){
      if (this.isRate){
        if (this.index < this.feedback.content.length - 1) {
          this.PostFeedback()
          this.index ++;
          this.ClearColor();
          this.isRate = false;
        } else if (this.index == this.feedback.content.length - 1){
          this.PostFeedback();
          this.router.navigate(['/feedbackEnd']);
          this.isRate = false;
        } else {
          this.GetError("Select an option.")
        }
      } else {
        this.GetError("Select an option.")
      }
    } else {
      this.GetError("Select an option.")
    }
  }

  PostFeedback(){
    if (this.feedback != undefined){
      const feedbackResult: IRoomAnswerFeedback = {
        roomCode: this.feedback.roomCode,
        content: this.feedback.content[this.index]
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

  GetError(error: string){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
      timer: 2000,
      timerProgressBar: true
    });
  }

  ChangeColor(color: number){
    const buttons = document.querySelectorAll('.vote') as NodeListOf<HTMLElement>;
    buttons.forEach((e) => {
      e.style.backgroundColor = "white";
    })
    if (color == 0){
      buttons[0].style.backgroundColor = "#FF6868"
    } else if (color == 1){
      buttons[1].style.backgroundColor = "#ffa578"
    } else if (color == 2){
      buttons[2].style.backgroundColor = "#FBA834"
    } else if (color == 3){
      buttons[3].style.backgroundColor = "#79db68"
    } else if (color == 4){
      buttons[4].style.backgroundColor = "#65B741"
    }
  }

  ClearColor(){
    const buttons = document.querySelectorAll('.feedback-view .vote') as NodeListOf<HTMLElement>;
    buttons.forEach((e) => {
      e.style.backgroundColor = "white";
    })
  }
}
