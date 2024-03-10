import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { IBrainstormingContent, IRoomBrainstorming } from 'src/app/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menti-brainstorming-builder',
  templateUrl: './menti-brainstorming-builder.component.html',
  styleUrls: ['./menti-brainstorming-builder.component.css']
})
export class MentiBrainstormingBuilderComponent {
  content: IBrainstormingContent[] = [];
  indexSlide: number = 0;
  backgrounds: string[] | undefined = undefined;

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    this.backgrounds = this.dataService.backgrounds;
    this.content.push({ question: "Question 1", ideas: [] });
  }

  AddSlide() {
    const newQuestion = `Question ${this.content.length + 1}`;
    this.content.push({
      question: newQuestion,
      ideas: []
    });
    this.indexSlide = this.content.length - 1;    
  }

  OpenSlide(index: number) {
    this.indexSlide = index;
  }

  PostBrainstorming() {    
    if (this.dataService.username) {
      const brainstorming: IRoomBrainstorming = {
        username: this.dataService.username,
        roomCode: this.dataService.GenerateRoomCode(),
        roomType: "Brainstorming",
        content: this.content
      };      
      this.httpService.PostRoomBrainstorming(brainstorming).subscribe(
        (response: any) => {
          this.dataService.roomBrainstorming = brainstorming;
          this.router.navigate(['/mentiBrainstormingResults']);
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
    } else {
      this.GetError('Error in the username.');
    }
  }

  ChangeBackground(bg: string) {
    const view = document.querySelector('.menti-brainstorming-builder .preview') as HTMLElement;
    view.style.backgroundImage = `url(assets/${bg})`;
    this.dataService.background = bg;
  }

  ChangeMode(mode: number) {
    const contentMode1 = document.querySelector('.menti-brainstorming-builder .content-mode1') as HTMLElement;
    const contentMode2 = document.querySelector('.menti-brainstorming-builder .content-mode2') as HTMLElement;
    const mode1 = document.querySelector('.menti-brainstorming-builder .mode .mode1') as HTMLElement;
    const mode2 = document.querySelector('.menti-brainstorming-builder .mode .mode2') as HTMLElement;

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

    mode1.classList.add("btn-mode-hover");
    mode2.classList.add("btn-mode-hover");
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
