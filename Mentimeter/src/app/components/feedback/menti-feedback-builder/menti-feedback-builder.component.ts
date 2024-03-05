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
  // Arreglo que contiene el contenido de cada diapositiva
  content: IFeedbackContent[] = [];

  // Pregunta actual para la diapositiva
  question: string = "Question 0";

  // Índice de la última diapositiva seleccionada
  lastSlide: number = 0;

  // Arreglo de fondos para las diapositivas
  backgrounds: IBackground[] | undefined = undefined;

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    // Inicialización de los fondos desde el servicio de datos
    this.backgrounds = this.dataService.backgrounds;

    // Creación de la primera diapositiva por defecto
    this.content.push({
      question: "Question 0",
      rating: [0, 0, 0, 0, 0]
    });
  }

  // Método para agregar una nueva diapositiva
  AddSlide() {
    // Actualizar la pregunta de la diapositiva actual
    this.content[this.lastSlide].question = this.question;
    // Crear una nueva pregunta para la siguiente diapositiva
    const newQuestion = `Question ${this.content.length}`;
    // Agregar la nueva diapositiva al contenido
    this.content.push({
      question: newQuestion,
      rating: [0, 0, 0, 0, 0]
    });
    // Actualizar la última diapositiva y la pregunta actual
    this.lastSlide = this.content.length - 1;
    this.question = newQuestion;
  }

  // Método para abrir una diapositiva seleccionada
  OpenSlide(index: number) {
    // Actualizar la pregunta de la diapositiva actual
    this.content[this.lastSlide].question = this.question;
    // Actualizar la última diapositiva y la pregunta actual
    this.lastSlide = index;
    this.question = this.content[index].question;
  }

  // Método para enviar el feedback
  PostFeedback() {
    // Actualizar la pregunta de la diapositiva actual
    this.content[this.lastSlide].question = this.question;
    if (this.dataService.username) {
      // Crear el objeto de feedback
      const feedback: IRoomFeedback = {
        username: this.dataService.username,
        roomCode: this.dataService.GenerateRoomCode(),
        roomType: "Feedback",
        content: this.content
      };
      // Enviar el feedback al servidor
      this.httpService.PostRoomFeedback(feedback).subscribe(
        (response: any) => {
          // Al recibir una respuesta exitosa, actualizar el servicio de datos y navegar a la página de resultados
          this.dataService.roomFeedback = feedback;
          this.router.navigate(['/mentiFeedbackResults']);
        },
        (error: any) => {
          // En caso de error, manejar la situación según el tipo de error
          if (error == "JsonWebTokenError") {
            this.router.navigate(["/"]);
          } else {
            this.GetError(error);
          }
          console.log(error);
        }
      );
    } else {
      // En caso de que no haya un nombre de usuario, mostrar un mensaje de error
      this.GetError('Error in the username.');
    }
  }

  // Método para cambiar el fondo de la diapositiva
  ChangeBackground(bg: IBackground) {
    // Obtener las referencias a los elementos de la diapositiva
    const view = document.querySelector('.menti-feedback-builder .preview') as HTMLElement;
    const text = document.querySelector('.menti-feedback-builder .preview p') as HTMLElement;

    // Cambiar la imagen de fondo y el color del texto
    view.style.backgroundImage = `url(assets/${bg.background})`;
    if (this.backgrounds) {
      this.backgrounds.forEach((e: IBackground) => {
        if (e.background == bg.background) {
          text.style.color = e.color;
        }
      });
    }
    // Actualizar el fondo en el servicio de datos
    this.dataService.background = bg.background;
  }

  // Método para cambiar el modo entre contenido y temas
  ChangeMode(mode: number) {
    // Obtener referencias a los elementos relevantes
    const contentMode1 = document.querySelector('.menti-feedback-builder .content-mode1') as HTMLElement;
    const contentMode2 = document.querySelector('.menti-feedback-builder .content-mode2') as HTMLElement;
    const mode1 = document.querySelector('.menti-feedback-builder .mode .mode1') as HTMLElement;
    const mode2 = document.querySelector('.menti-feedback-builder .mode .mode2') as HTMLElement;

    // Actualizar la visualización según el modo seleccionado
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

    // Agregar clases de estilo para resaltar el modo seleccionado
    mode1.classList.add("btn-mode-hover");
    mode2.classList.add("btn-mode-hover");
  }

  // Método para mostrar mensajes de error
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
