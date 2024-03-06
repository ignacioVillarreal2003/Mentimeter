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
  index: number = 0;
  isRate: boolean = false;

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    const dataMultipleChoice: IRoomMultipleChoice | undefined = this.dataService.roomMultipleChoice;
    if (dataMultipleChoice != undefined) {
      this.multipleChoice = dataMultipleChoice;
    }
  }

  DoRate(n: number) {
    if (this.multipleChoice) {
      const option: IMultipleChoiceOption[] = this.multipleChoice.content[this.index].optionsMultipleChoice;
      option.forEach((e: IMultipleChoiceOption) => {
        e.rating = 0;
      })
      this.multipleChoice.content[this.index].optionsMultipleChoice[n].rating = 1;
      this.isRate = true;
    }
  }

  NextQuestion() {
    if (this.multipleChoice != undefined) {
      if (this.isRate) {
        if (this.index < this.multipleChoice.content.length - 1) {
          this.PostMultipleChoice()
          this.index++;
          this.ClearColor();
          this.isRate = false;
        } else if (this.index == this.multipleChoice.content.length - 1) {
          this.PostMultipleChoice();
          this.router.navigate(['/mentiEnd']);
          this.isRate = false;
        } else {
          // Mostrar mensaje de error si no se ha seleccionado una opción
          this.GetError("Select an option.");
        }
      } else {
        // Mostrar mensaje de error si no se ha seleccionado una opción
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
        content: this.multipleChoice.content[this.index]
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

  // Método para cambiar el color de las opciones de calificación
  ChangeColor(color: number) {
    const buttons = document.querySelectorAll('.multiple-choice .vote') as NodeListOf<HTMLElement>;
    // Establecer el fondo blanco para todas las opciones
    buttons.forEach((e) => {
      e.style.backgroundColor = "white";
    })
    // Establecer el color de fondo según la opción seleccionada
    if (color >= 0 && color < buttons.length) {
      buttons[color].style.backgroundColor = this.getBackgroundColorByIndex(color);
    }
  }

  // Método para limpiar los colores de las opciones de calificación
  ClearColor() {
    const buttons = document.querySelectorAll('.multiple-choice-view .vote') as NodeListOf<HTMLElement>;
    // Establecer el fondo blanco para todas las opciones
    buttons.forEach((e) => {
      e.style.backgroundColor = "white";
    })
  }

  // Método auxiliar para obtener el color de fondo según el índice
  private getBackgroundColorByIndex(index: number): string {
    const colorMap = ["#FF6868", "#ffa578", "#FBA834", "#79db68", "#65B741"];
    return colorMap[index] || "white";
  }
}
