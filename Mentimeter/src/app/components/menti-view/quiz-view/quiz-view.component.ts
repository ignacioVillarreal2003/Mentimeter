import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { IQuizOption, IRoomAnswersQuiz, IRoomQuiz } from 'src/app/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css']
})
export class QuizViewComponent {
  quiz: IRoomQuiz | undefined = undefined;
  indexContent: number = 0;
  isRate: boolean = false;

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    const dataQuiz: IRoomQuiz | undefined = this.dataService.roomQuiz;
    if (dataQuiz != undefined) {
      this.quiz = dataQuiz;
    }
  }

  DoRate(n: number) {
    if (this.quiz) {
      const option: IQuizOption[] = this.quiz.content[this.indexContent].optionsQuiz;
      option.forEach((e: IQuizOption) => {
        e.quantity = 0;
      })
      this.quiz.content[this.indexContent].optionsQuiz[n].quantity = 1;
      this.isRate = true;
    }
  }

  NextQuestion() {
    if (this.quiz != undefined) {
      if (this.isRate) {
        if (this.indexContent < this.quiz.content.length - 1) {
          this.PostQuiz()
          this.indexContent++;
          this.ClearColor();
          this.isRate = false;
        } else if (this.indexContent == this.quiz.content.length - 1) {
          this.PostQuiz();
          this.router.navigate(['/end']);
          this.isRate = false;
        } else {
          this.GetError("Select an option.");
        }
      } else {
        this.GetError("Select an option.");
      }
    } else {
      this.GetError("Select an option.")
    }
  }

  PostQuiz() {
    if (this.quiz != undefined) {
      const quizResult: IRoomAnswersQuiz = {
        roomCode: this.quiz.roomCode,
        content: this.quiz.content[this.indexContent]
      }
      this.httpService.PostRoomAnswersQuiz(quizResult).subscribe(
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
    const buttons = document.querySelectorAll('.quiz-view .shape') as NodeListOf<HTMLElement>;
    buttons.forEach((e) => {
      e.style.backgroundColor = "white";
    })
    if (color >= 0 && color < buttons.length) {
      buttons[color].style.backgroundColor = "#79db68";
    }
  }

  ClearColor() {
    const buttons = document.querySelectorAll('.quiz-view .shape') as NodeListOf<HTMLElement>;
    buttons.forEach((e) => {
      e.style.backgroundColor = "white";
    })
  }
}

