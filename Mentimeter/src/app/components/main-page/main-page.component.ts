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
  username: string = "";
  password: string = "";

  constructor(private dataService: DataService, private httpService: HttpService, private router: Router) { }

  JoinRoom() {
    if (this.CheckRoomCodeData()) {
      this.httpService.GetRoom(this.roomCode).subscribe(
        (response: IRoomFeedback | IRoomBrainstorming | IRoomQuiz | IRoomMultipleChoice | undefined) => {
          if (response) {
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
                this.GetError('Error obtaining the room.');
            }
          } else {
            this.GetError('Error obtaining the room.');
          }
        },
        (error: any) => {
          this.GetError(error);
          console.log(error);
        }
      );
    }
  }

  Login() {
    if (this.CheckUserData()) {
      this.httpService.Login(this.username, this.password).subscribe(
        (response: any) => {
          this.dataService.username = this.username;
          localStorage.setItem('token', response);
          this.router.navigate(['/createMenti']);
        },
        (error: any) => {
          this.GetError(error);
        }
      );
    }
  }

  Register() {
    if (this.CheckUserData()) {
      this.httpService.Register(this.username, this.password).subscribe(
        (response: any) => {
          this.dataService.username = this.username;
          localStorage.setItem('token', response);
          this.router.navigate(['/createMenti']);
        },
        (error: any) => {
          this.GetError(error);
        }
      );
    }
  }

  HandleRoomResponse(response: any, dataServiceProperty: string, route: string) {
    this.dataService[dataServiceProperty] = response;
    this.router.navigate([route]);
  }

  CheckUserData() {
    if (this.username.length < 8) {
      this.GetError("Username of at least 8 characters.");
      return false;
    }
    if (this.password.length < 8) {
      this.GetError("Password of at least 8 characters.");
      return false;
    }
    return true;
  }

  CheckRoomCodeData() {
    if (this.roomCode.length != 8) {
      this.GetError("Room code of at least 8 characters.");
      return false;
    }
    return true;
  }

  ChangeMode(mode: number) {
    const modeOneView = document.querySelector('.main-page .mode1') as HTMLElement;
    const modeTwoView = document.querySelector('.main-page .mode2') as HTMLElement;

    if (mode == 1) {
      modeOneView.style.display = "flex";
      modeTwoView.style.display = "none";

    } else if (mode == 2) {
      modeOneView.style.display = "none";
      modeTwoView.style.display = "flex";
    }
    this.username = "";
    this.password = "";
    this.roomCode = "";
  }

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

