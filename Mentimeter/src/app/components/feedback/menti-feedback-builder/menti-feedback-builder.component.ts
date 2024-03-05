import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { IBackground, IFeedbackContent, IRoomFeedback } from 'src/app/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menti-feedback-builder',
  templateUrl: './menti-feedback-builder.component.html',
  styleUrls: ['./menti-feedback-builder.component.css']
})
export class MentiFeedbackBuilderComponent {
  content: IFeedbackContent[] = [];
  question: string = "Question 0";

  lastSlide: number = 0;

  backgrounds: IBackground[] | undefined = undefined
  imageRoute = "../../../../assets";

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService){}

  ngOnInit(){
    this.backgrounds = this.dataService.backgrounds;

    this.content.push({
      question: "Question 0",
      rating: [0, 0, 0, 0, 0]
    })
  }

  AddSlide(){
    this.content.push({
      question: `Question ${this.content.length}`,
      rating: [0, 0, 0, 0, 0]
    })
  }

  OpenSlide(index: number){
    this.content[this.lastSlide].question = this.question;
    this.lastSlide = index;
    this.question = this.content[index].question;
  }

  PostFeedback(){
    this.content[this.lastSlide].question = this.question;
    if (this.dataService.username){
      const feedback: IRoomFeedback = {
        username: this.dataService.username,
        roomCode: this.dataService.GenerateRoomCode(),
        roomType: "Feedback",
        content: this.content
      }    
      this.httpService.PostRoomFeedback(feedback).subscribe(
        (response: any) => {
          this.dataService.roomFeedback = feedback;
          this.router.navigate(['/mentiFeedbackResults']);
        },
        (error: any) => {
          if (error == "JsonWebTokenError"){
            this.router.navigate(["/"]);
          } else {
            this.GetError(error);
          }
          console.log(error);
        }
      );
    }
  }

  ChangeBackground(bg: IBackground) {
    const view = document.querySelector('.menti-feedback-builder .preview') as HTMLElement;
    const text = document.querySelector('.menti-feedback-builder .preview p') as HTMLElement;
    view.style.backgroundImage = `url(${this.imageRoute}/${bg.background})`;
    if (this.backgrounds){
      this.backgrounds.forEach((e: IBackground) => {
        if (e.background == bg.background){
          text.style.color = e.color;
        }
      })
    }
    this.dataService.background = bg.background;
  }
  
  ChangeMode(mode: number){
    const contentMode1 = document.querySelector('.menti-feedback-builder .content-mode1') as HTMLElement;
    const contentMode2 = document.querySelector('.menti-feedback-builder .content-mode2') as HTMLElement;
    const mode1 = document.querySelector('.menti-feedback-builder .mode .mode1') as HTMLElement;
    const mode2 = document.querySelector('.menti-feedback-builder .mode .mode2') as HTMLElement;
    if (mode == 1){
      contentMode1.style.display = "flex";
      contentMode2.style.display = "none";
      mode1.classList.add('modeOn');
      mode1.classList.remove('modeOff');
      mode2.classList.remove('modeOn');
      mode2.classList.add('modeOff');   
    }
    else if (mode == 2){
      contentMode1.style.display = "none";
      contentMode2.style.display = "flex";
      mode1.classList.add('modeOff');
      mode1.classList.remove('modeOn');
      mode2.classList.add('modeOn');
      mode2.classList.remove('modeOff');
    }
    mode1.classList.add("btn-mode-hover")
    mode2.classList.add("btn-mode-hover")
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
}
