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
  roomCode: string = "";

  constructor(private dataService: DataService, private httpService: HttpService,  private router: Router){}

  JoinRoom() {
    this.httpService.GetRoom(this.roomCode).subscribe(
      (response: IRoomFeedback | IRoomBrainstorming | IRoomQuiz | IRoomMultipleChoice | undefined) => {
        if (response) {
          console.log(response);
          switch (response.roomType) {
            case 'Feedback':
              this.HandleRoomResponse(response, 'roomFeedback', '/feedbackView');
              break;
            case 'MultipleChoice':
              console.log("entra");
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
          this.GetError('Error obteniendo la sala.');
        }
      },
      (error: any) => {
        this.GetError(error);
        console.log(error);
      }
    );
  }
  
  HandleRoomResponse(response: any, dataServiceProperty: string, route: string) {
    this.dataService[dataServiceProperty] = response;
    this.router.navigate([route]);
  }

  GetError(error: string){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
      timer: 2000,
      timerProgressBar: true
    });
  }
}

