import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SocketService } from 'src/app/services/socket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IBackground, IRoomFeedback } from 'src/app/types';

@Component({
  selector: 'app-menti-feedback-results',
  templateUrl: './menti-feedback-results.component.html',
  styleUrls: ['./menti-feedback-results.component.css']
})
export class MentiFeedbackResultsComponent {

  // Índice de la pregunta actual
  indexQuestion: number = 0;

  // Objeto de feedback
  feedback: IRoomFeedback | undefined = undefined;

  // Suscripción al servicio de socket
  private subscription?: Subscription;

  // Lista de imágenes de retroalimentación
  feed = [
    { image: "feed1.svg", index: 0 },
    { image: "feed2.svg", index: 1 },
    { image: "feed3.svg", index: 2 },
    { image: "feed4.svg", index: 3 },
    { image: "feed5.svg", index: 4 },
  ]

  constructor(private dataService: DataService, private socketService: SocketService, private router: Router) {
    // Obtener el feedback almacenado en el servicio de datos
    const dataFeedback: IRoomFeedback | undefined = this.dataService.roomFeedback;

    // Verificar si hay feedback disponible
    if (dataFeedback) {
      // Inicializar el feedback y conectar el socket
      this.feedback = dataFeedback;
      this.socketService.connectSocket();

      // Suscribirse a nuevos mensajes del socket
      this.subscription = this.socketService.getNewMessage().subscribe((message: string[]) => {
        // Parsear el feedback recibido
        const receivedFeedback: IRoomFeedback = JSON.parse(message[1])[1];

        // Verificar si el mensaje es de tipo 'sendNewFeedback' y corresponde a la sala actual
        if (message[0] === 'sendNewFeedback' && receivedFeedback.roomCode === this.feedback?.roomCode) {
          // Actualizar el contenido del feedback
          const content = receivedFeedback.content;
          if (this.feedback) {
            this.feedback.content = content;
          }
        }
      });
    }
  }

  ngAfterViewInit() {
    // Cambiar el tema de la interfaz gráfica
    this.ChangeTheme();
  }

  // Método para cambiar el tema de la interfaz gráfica
  ChangeTheme() {
    // Obtener referencias a elementos de la interfaz gráfica
    const texto1 = document.querySelector('.menti-feedback-results h1') as HTMLElement;
    const texto2 = document.querySelector('.menti-feedback-results .question') as HTMLElement;
    const texto3 = document.querySelectorAll('.menti-feedback-results .vote') as NodeListOf<HTMLElement>;
    const background = document.querySelector('.menti-feedback-results') as HTMLElement;
    const controls = document.querySelectorAll('.menti-feedback-results .controls button') as NodeListOf<HTMLElement>;

    // Color por defecto es negro
    let color: string = "black";

    // Buscar el color correspondiente al fondo actual
    this.dataService.backgrounds.forEach((e: IBackground) => {
      if (e.background == this.dataService.background) {
        color = e.color;
      }
    })

    // Aplicar los colores y fondo a los elementos de la interfaz gráfica
    texto1.style.color = color;
    texto2.style.color = color;
    texto3.forEach((e) => {
      e.style.color = color;
    })
    background.style.backgroundImage = `url(assets/${this.dataService.background})`;

    // Invertir los colores si el fondo es blanco
    if (color == "white") {
      controls.forEach((e) => {
        e.style.filter = "invert(100%)";
      })
    }
  }

  // Método para avanzar a la siguiente pregunta
  NextQuestion() {
    // Verificar si hay feedback y si hay más preguntas disponibles
    if (this.feedback && this.indexQuestion < this.feedback.content.length - 1) {
      this.indexQuestion++;
    }
  }

  // Método para retroceder a la pregunta anterior
  PreviousQuestion() {
    // Verificar si hay preguntas anteriores disponibles
    if (this.indexQuestion > 0) {
      this.indexQuestion--;
    }
  }

  ngOnDestroy() {
    // Cerrar la conexión del socket al destruir el componente
    this.socketService.closeSocket();
  }

  // Método para cerrar la conexión del socket y navegar a la página de creación de Menti
  CloseSocket() {
    // Verificar si hay una suscripción y feedback disponibles
    if (this.subscription && this.feedback) {
      // Dejar la sala y cerrar el socket
      this.socketService.leaveRoom(this.feedback.roomCode);
      this.socketService.closeSocket();

      // Navegar a la página de creación de Menti y limpiar el feedback almacenado
      this.router.navigate(['/createMenti']);
      this.dataService.roomFeedback = undefined;
    }
  }
}
