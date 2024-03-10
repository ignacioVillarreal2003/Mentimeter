import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { IQuizContent, IRoomQuiz } from 'src/app/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menti-quiz-builder',
  templateUrl: './menti-quiz-builder.component.html',
  styleUrls: ['./menti-quiz-builder.component.css']
})
export class MentiQuizBuilderComponent {
  content: IQuizContent[] = [];
  indexSlide: number = 0;
  opcionNumber: number = 1;
  backgrounds: string[] | undefined = undefined;

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    this.backgrounds = this.dataService.backgrounds;

    this.content.push({
      question: "Question 1",
      optionsQuiz: [{ option: "Option 1", isCorect: false, quantity: 0 }, { option: "Option 2", isCorect: false, quantity: 0 }, { option: "Option 3", isCorect: false, quantity: 0 }]
    })
  }

  AddSlide() {
    const newQuestion = `Question ${this.content.length + 1}`;
    const newOptions = [{ option: "Option 1", isCorect: false, quantity: 0 }, { option: "Option 2", isCorect: false, quantity: 0 }, { option: "Option 3", isCorect: false, quantity: 0 }];
    this.content.push({
      question: newQuestion,
      optionsQuiz: newOptions
    })
    this.indexSlide = this.content.length - 1;
  }

  OpenSlide(index: number) {
    this.indexSlide = index;
  }

  AddOption() {
    if (this.content[this.indexSlide].optionsQuiz.length < 6) {
      this.content[this.indexSlide].optionsQuiz.push({ option: `Option ${this.content[this.indexSlide].optionsQuiz.length + 1}`, isCorect: false, quantity: 0 });
    } else {
      this.GetError("Max options, 6 options is the max.")
    }
  }

  PostQuiz() {
    if (this.dataService.username) {
      const quiz: IRoomQuiz = {
        username: this.dataService.username,
        roomCode: this.dataService.GenerateRoomCode(),
        roomType: "Quiz",
        content: this.content
      }
      this.httpService.PostRoomQuiz(quiz).subscribe(
        (response: any) => {
          this.dataService.roomQuiz = quiz;
          this.router.navigate(['/mentiQuizResults']);
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
    }
  }

  ChangeBackground(bg: string) {
    const view = document.querySelector('.menti-quiz-builder .preview') as HTMLElement;
    view.style.backgroundImage = `url(assets/${bg})`;
    this.dataService.background = bg;
  }

  ChangeMode(mode: number) {
    const contentMode1 = document.querySelector('.menti-quiz-builder .content-mode1') as HTMLElement;
    const contentMode2 = document.querySelector('.menti-quiz-builder .content-mode2') as HTMLElement;
    const mode1 = document.querySelector('.menti-quiz-builder .mode .mode1') as HTMLElement;
    const mode2 = document.querySelector('.menti-quiz-builder .mode .mode2') as HTMLElement;
    if (mode == 1) {
      contentMode1.style.display = "flex";
      contentMode2.style.display = "none";
      mode1.classList.add('modeOn');
      mode1.classList.remove('modeOff');
      mode2.classList.remove('modeOn');
      mode2.classList.add('modeOff');
    }
    else if (mode == 2) {
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
