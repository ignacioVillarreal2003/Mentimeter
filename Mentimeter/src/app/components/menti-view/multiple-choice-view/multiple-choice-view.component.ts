import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { IMultipleChoiceOption, IRoomAnswersMultipleChoice, IRoomMultipleChoice } from 'src/app/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-multiple-choice-view',
  templateUrl: './multiple-choice-view.component.html',
  styleUrls: ['./multiple-choice-view.component.css']
})
export class MultipleChoiceViewComponent {
  multipleChoice: IRoomMultipleChoice | undefined = undefined;
  indexContent: number = 0;
  isRate: boolean = false;

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    const dataMultipleChoice: IRoomMultipleChoice | undefined = this.dataService.roomMultipleChoice;
    if (dataMultipleChoice != undefined) {
      this.multipleChoice = dataMultipleChoice;
    }
  }

  DoRate(n: number) {
    if (this.multipleChoice) {
      const option: IMultipleChoiceOption[] = this.multipleChoice.content[this.indexContent].optionsMultipleChoice;
      option.forEach((e: IMultipleChoiceOption) => {
        e.rating = 0;
      })
      this.multipleChoice.content[this.indexContent].optionsMultipleChoice[n].rating = 1;
      this.isRate = true;
    }
  }

  NextQuestion() {
    if (this.multipleChoice != undefined) {
      if (this.isRate) {
        if (this.indexContent < this.multipleChoice.content.length - 1) {
          this.PostMultipleChoice()
          this.indexContent++;
          this.ClearColor();
          this.isRate = false;
        } else if (this.indexContent == this.multipleChoice.content.length - 1) {
          this.PostMultipleChoice();
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

  PostMultipleChoice() {
    if (this.multipleChoice != undefined) {
      const multipleChoiceResult: IRoomAnswersMultipleChoice = {
        roomCode: this.multipleChoice.roomCode,
        content: this.multipleChoice.content[this.indexContent]
      }
      this.httpService.PostRoomAnswersMultipleChoice(multipleChoiceResult).subscribe(
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
    console.log(color);
    const buttons = document.querySelectorAll('.multiple-choice-view .shape') as NodeListOf<HTMLElement>;
    buttons.forEach((e) => {
      e.style.backgroundColor = "white";
    })
    if (color >= 0 && color < buttons.length) {
      buttons[color].style.backgroundColor = "#79db68";
    }
  }

  ClearColor() {
    const buttons = document.querySelectorAll('.multiple-choice-view .shape') as NodeListOf<HTMLElement>;
    buttons.forEach((e) => {
      e.style.backgroundColor = "white";
    })
  }
}
