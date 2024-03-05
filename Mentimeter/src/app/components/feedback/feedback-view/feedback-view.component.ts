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

  // Objeto de feedback
  feedback: IRoomFeedback | undefined = undefined;

  // Índice de la pregunta actual
  index: number = 0;

  // Variable que indica si ya se ha calificado
  isRate: boolean = false;

  // Lista de imágenes de retroalimentación
  feed = [
    { image: "feed1.svg", indexRate: 0 },
    { image: "feed2.svg", indexRate: 1 },
    { image: "feed3.svg", indexRate: 2 },
    { image: "feed4.svg", indexRate: 3 },
    { image: "feed5.svg", indexRate: 4 },
  ]

  // Constructor del componente, se ejecuta al crear una instancia del componente
  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    // Obtener el feedback almacenado en el servicio de datos
    const dataFeedback: IRoomFeedback | undefined = this.dataService.roomFeedback;
    // Verificar si hay feedback disponible
    if (dataFeedback != undefined) {
      // Inicializar el feedback
      this.feedback = dataFeedback;
    }
  }

  // Método para calificar una respuesta
  DoRate(n: number) {
    // Verificar si hay feedback disponible
    if (this.feedback) {
      // Crear un arreglo de calificación y asignar la calificación seleccionada
      const rating: [number, number, number, number, number] = [0, 0, 0, 0, 0];
      rating[n] = 1;
      // Asignar la calificación a la pregunta actual y marcar como calificado
      this.feedback.content[this.index].rating = rating;
      this.isRate = true;
    }
  }

  // Método para avanzar a la siguiente pregunta o finalizar el feedback
  NextQuestion() {
    // Verificar si hay feedback disponible
    if (this.feedback != undefined) {
      // Verificar si ya se ha calificado
      if (this.isRate) {
        // Verificar si hay más preguntas disponibles
        if (this.index < this.feedback.content.length - 1) {
          // Enviar la calificación al servidor y avanzar a la siguiente pregunta
          this.PostFeedback();
          this.index++;
          // Limpiar los colores de las opciones de calificación
          this.ClearColor();
          this.isRate = false;
        } else if (this.index == this.feedback.content.length - 1) {
          // Enviar la calificación al servidor y navegar a la página de finalización del feedback
          this.PostFeedback();
          this.router.navigate(['/feedbackEnd']);
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
      // Mostrar mensaje de error si no hay feedback disponible
      this.GetError("Error in feedback.");
    }
  }

  // Método para enviar el feedback al servidor
  PostFeedback() {
    // Verificar si hay feedback disponible
    if (this.feedback != undefined) {
      // Crear el objeto de respuesta de feedback
      const feedbackResult: IRoomAnswerFeedback = {
        roomCode: this.feedback.roomCode,
        content: this.feedback.content[this.index]
      }
      // Enviar la respuesta de feedback al servidor
      this.httpService.PostRoomAnswersFeedback(feedbackResult).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          // Mostrar mensaje de error en caso de error en la solicitud
          this.GetError(error);
          console.log(error);
        }
      );
    }
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

  // Método para cambiar el color de las opciones de calificación
  ChangeColor(color: number) {
    const buttons = document.querySelectorAll('.vote') as NodeListOf<HTMLElement>;
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
    const buttons = document.querySelectorAll('.feedback-view .vote') as NodeListOf<HTMLElement>;
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
