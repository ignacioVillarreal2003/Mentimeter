import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { IFeedbackContent, IRoomFeedback } from 'src/app/types';
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

  backgrounds: string[] | undefined = undefined;

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    this.backgrounds = this.dataService.backgrounds;
    this.content.push({ question: "Question 0", rating: [0, 0, 0, 0, 0] });
  }

  AddSlide() {
    this.content[this.lastSlide].question = this.question;
    const newQuestion = `Question ${this.content.length}`;
    this.content.push({
      question: newQuestion,
      rating: [0, 0, 0, 0, 0]
    });
    this.lastSlide = this.content.length - 1;
    this.question = newQuestion;
  }

  OpenSlide(index: number) {
    this.content[this.lastSlide].question = this.question;
    this.lastSlide = index;
    this.question = this.content[index].question;
  }

  PostFeedback() {
    this.content[this.lastSlide].question = this.question;
    if (this.dataService.username) {
      const feedback: IRoomFeedback = {
        username: this.dataService.username,
        roomCode: this.dataService.GenerateRoomCode(),
        roomType: "Feedback",
        content: this.content
      };
      this.httpService.PostRoomFeedback(feedback).subscribe(
        (response: any) => {
          this.dataService.roomFeedback = feedback;
          this.router.navigate(['/mentiFeedbackResults']);
        },
        (error: any) => {
          if (error == "JsonWebTokenError") {
            this.router.navigate(["/"]);
          } else {
            this.GetError(error);
          }
          console.log(error);
        }
      );
    } else {
      this.GetError('Error in the username.');
    }
  }

  ChangeBackground(bg: string) {
    const view = document.querySelector('.menti-feedback-builder .preview') as HTMLElement;
    view.style.backgroundImage = `url(assets/${bg})`;
    this.dataService.background = bg;
  }

  ChangeMode(mode: number) {
    const contentMode1 = document.querySelector('.menti-feedback-builder .content-mode1') as HTMLElement;
    const contentMode2 = document.querySelector('.menti-feedback-builder .content-mode2') as HTMLElement;
    const mode1 = document.querySelector('.menti-feedback-builder .mode .mode1') as HTMLElement;
    const mode2 = document.querySelector('.menti-feedback-builder .mode .mode2') as HTMLElement;

    if (mode == 1) {
      contentMode1.style.display = "flex";
      contentMode2.style.display = "none";
      mode1.classList.add('modeOn');
      mode1.classList.remove('modeOff');
      mode2.classList.remove('modeOn');
      mode2.classList.add('modeOff');
    } else if (mode == 2) {
      contentMode1.style.display = "none";
      contentMode2.style.display = "flex";
      mode1.classList.add('modeOff');
      mode1.classList.remove('modeOn');
      mode2.classList.add('modeOn');
      mode2.classList.remove('modeOff');
    }

    mode1.classList.add("btn-mode-hover");
    mode2.classList.add("btn-mode-hover");
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
}
