import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2'
import { IRoomBrainstorming, IRoomFeedback, IRoomMultipleChoice, IRoomQuiz } from 'src/app/types';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  // Variable para almacenar el código de la sala
  roomCode: string = "";

  constructor(private dataService: DataService, private httpService: HttpService, private router: Router) {}

  // Método para unirse a una sala
  JoinRoom() {
    // Enviar solicitud al servicio HTTP para obtener la información de la sala
    this.httpService.GetRoom(this.roomCode).subscribe(
      // Manejar la respuesta de la solicitud
      (response: IRoomFeedback | IRoomBrainstorming | IRoomQuiz | IRoomMultipleChoice | undefined) => {
        // Verificar si se obtuvo una respuesta válida
        if (response) {
          // Determinar el tipo de sala y redirigir según el tipo
          switch (response.roomType) {
            case 'Feedback':
              this.HandleRoomResponse(response, 'roomFeedback', '/feedbackView');
              break;
            case 'MultipleChoice':
              this.HandleRoomResponse(response, 'roomMultipleChoice', '/multipleChoiceView');
              break;
            case 'Brainstorming':
              this.HandleRoomResponse(response, 'roomBrainstorming', '/brainstormingView');
              break;
            case 'Quiz':
              this.HandleRoomResponse(response, 'roomQuiz', '/quizView');
              break;
            default:
              this.GetError('Error obteniendo la sala.');
          }
        } else {
          // Mostrar mensaje de error si no se obtuvo una respuesta válida
          this.GetError('Error obteniendo la sala.');
        }
      },
      // Manejar errores de la solicitud
      (error: any) => {
        // Mostrar mensaje de error y registrar el error en la consola
        this.GetError(error);
        console.log(error);
      }
    );
  }

  // Método para manejar la respuesta de la sala y redirigir
  HandleRoomResponse(response: any, dataServiceProperty: string, route: string) {
    // Almacenar la información de la sala en el servicio de datos
    this.dataService[dataServiceProperty] = response;
    // Navegar a la ruta especificada
    this.router.navigate([route]);
  }

  // Método para mostrar mensajes de error
  GetError(error: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
      timer: 2000,
      timerProgressBar: true
    });
  }
}

