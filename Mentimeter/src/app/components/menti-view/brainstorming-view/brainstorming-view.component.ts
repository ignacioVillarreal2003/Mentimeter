import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { IBrainstormingContent, IRoomAnswersBrainstorming, IRoomBrainstorming } from 'src/app/types';

@Component({
  selector: 'app-brainstorming-view',
  templateUrl: './brainstorming-view.component.html',
  styleUrls: ['./brainstorming-view.component.css']
})
export class BrainstormingViewComponent {

  brainstorming: IRoomBrainstorming | undefined = undefined;
  indexContent: number = 0;
  response: string = "";

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    const dataBrainstorming: IRoomBrainstorming | undefined = this.dataService.roomBrainstorming;
    if (dataBrainstorming != undefined) {
      this.brainstorming = dataBrainstorming;
      this.brainstorming.content.forEach((e: IBrainstormingContent) => {
        e.ideas = [];
      })
    }
  }

  NextQuestion() {
    if (this.brainstorming != undefined) {
        if (this.indexContent < this.brainstorming.content.length - 1) {
          this.brainstorming.content[this.indexContent].ideas.push(this.response);
          this.PostBrainsorming();
          this.indexContent++;
          this.response = "";
        } else if (this.indexContent == this.brainstorming.content.length - 1) {
          this.brainstorming.content[this.indexContent].ideas.push(this.response);
          this.PostBrainsorming();
          this.router.navigate(['/end']);
        } else {
          this.GetError("Select an option.");
        }
      } 
    else {
      this.GetError("Error in feedback.");
    }
  }

  PostBrainsorming() {
    if (this.brainstorming != undefined) {
      const brainsormingResult: IRoomAnswersBrainstorming = {
        roomCode: this.brainstorming.roomCode,
        content: this.brainstorming.content[this.indexContent]
      }
      console.log(brainsormingResult);
      this.httpService.PostRoomAnswersBrainstorming(brainsormingResult).subscribe(
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
}
