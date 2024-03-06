import { Component } from '@angular/core';

@Component({
  selector: 'app-create-menti',
  templateUrl: './create-menti.component.html',
  styleUrls: ['./create-menti.component.css']
})
export class CreateMentiComponent {
  
  modes: any = [
    { class: "option1", router: "/mentiMultipleChoiceBuilder", image: `assets/MultipleChoice.png`, title: "Multiple choice" },
    { class: "option2", router: "/mentiFeedbackBuilder", image: `assets/Feedback.png`, title: "Feedback" },
    { class: "option3", router: "/mentiBrainstormingBuilder", image: `assets/Brainstorming.png`, title: "Brainstorming" },
    { class: "option4", router: "/mentiQuizBuilder", image: `assets/Quiz.png`, title: "Quiz" }
  ]
}
