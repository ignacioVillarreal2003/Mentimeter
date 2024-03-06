import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { IMultipleChoiceContent, IMultipleChoiceOption, IRoomMultipleChoice } from 'src/app/types';

@Component({
  selector: 'app-menti-multiple-choice-builder',
  templateUrl: './menti-multiple-choice-builder.component.html',
  styleUrls: ['./menti-multiple-choice-builder.component.css']
})
export class MentiMultipleChoiceBuilderComponent {

  content: IMultipleChoiceContent[] = [];
  question: string = "Question 0";
  texts: string[] = ["Option 0", "Option 1", "Option 2"];
  selectedOption: number = 1;
  inputText: string = '';
  lastSlide: number = 0;

  backgrounds: string[] | undefined = undefined;

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    this.backgrounds = this.dataService.backgrounds;

    this.content.push({
      question: "Question 0",
      optionsMultipleChoice: [{ option: "Option 0", rating: 0 }, { option: "Option 1", rating: 0 }, { option: "Option 2", rating: 0 }]
    })
  }

  AddSlide() {
    // Actualizar la pregunta de la diapositiva actual
    this.content[this.lastSlide].question = this.question;
    this.content[this.lastSlide].optionsMultipleChoice = this.texts.map((texto, i) => {
      return {
        option: texto,
        rating: 0
      };
    });
    // Crear una nueva pregunta para la siguiente diapositiva
    const newQuestion = `Question ${this.content.length}`;
    const newOptions = [{ option: "Option 0", rating: 0 }, { option: "Option 1", rating: 0 }, { option: "Option 2", rating: 0 }];
    // Agregar la nueva diapositiva al contenido
    this.content.push({
      question: newQuestion,
      optionsMultipleChoice: newOptions
    })
    // Actualizar la última diapositiva y la pregunta actual
    this.lastSlide = this.content.length - 1;
    this.question = newQuestion;
    this.texts = newOptions.map((o) => o.option);
  }

  OpenSlide(index: number) {
    // Guarda los datos del slide actual antes de cambiar
    this.content[this.lastSlide].question = this.question;
    this.content[this.lastSlide].optionsMultipleChoice = this.texts.map((texto, i) => {
      return {
        option: texto,
        rating: 0
      };
    });
    // Actualiza los datos para el nuevo slide
    this.texts = [];
    this.content[index].optionsMultipleChoice.forEach((e: IMultipleChoiceOption) => {
      this.texts.push(e.option);
    });
    this.question = this.content[index].question;

    // Actualiza el índice del último slide abierto
    this.lastSlide = index;
  }


  ChangeOption(event: Event, optionNumber: number) {
    const text = (event.target as HTMLInputElement).value;
    if (text.length < 35) {
      this.texts[optionNumber - 1] = text;
    } else {
      this.GetError("Text option is too large, 35 characters is the max.")
    }
  }

  ClearText() {
    this.inputText = '';
  }

  AddOption() {
    if (this.texts.length < 6) {
      this.texts.push(`Option ${this.texts.length}`);
    } else {
      this.GetError("Max options, 6 options is the max.")
    }
  }

  PostMultipleChoice() {
    this.content[this.lastSlide].question = this.question;
    this.content[this.lastSlide].optionsMultipleChoice = this.texts.map((texto, i) => {
      return {
        option: texto,
        rating: 0
      };
    });
    if (this.dataService.username) {
      const multipleChoice: IRoomMultipleChoice = {
        username: this.dataService.username,
        roomCode: this.dataService.GenerateRoomCode(),
        roomType: "MultipleChoice",
        content: this.content
      }
      this.httpService.PostRoomMultipleChoice(multipleChoice).subscribe(
        (response: any) => {
          this.dataService.roomMultipleChoice = multipleChoice;
          this.router.navigate(['/mentiMultipleChoiceResults']);
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

  // Método para cambiar el fondo de la diapositiva
  ChangeBackground(bg: string) {
    const view = document.querySelector('.menti-multiple-choice-builder .preview') as HTMLElement;
    view.style.backgroundImage = `url(assets/${bg})`;
    // Actualizar el fondo en el servicio de datos
    this.dataService.background = bg;
  }

  ChangeMode(mode: number) {
    const contentMode1 = document.querySelector('.menti-multiple-choice-builder .content-mode1') as HTMLElement;
    const contentMode2 = document.querySelector('.menti-multiple-choice-builder .content-mode2') as HTMLElement;
    const mode1 = document.querySelector('.menti-multiple-choice-builder .mode .mode1') as HTMLElement;
    const mode2 = document.querySelector('.menti-multiple-choice-builder .mode .mode2') as HTMLElement;
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
