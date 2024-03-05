import { Component } from '@angular/core';

@Component({
  selector: 'app-create-menti',
  templateUrl: './create-menti.component.html',
  styleUrls: ['./create-menti.component.css']
})
export class CreateMentiComponent {

  imageRoute = "../../../assets";

  modes: any = [
    {
      class: "option1",
      router: "/mentiMultipleChoiceBuilder",
      image: `${this.imageRoute}/MultipleChoice.png`,
      title: "Multiple choice"
    },
    {
      class: "option2",
      router: "/mentiFeedbackBuilder",
      image: `${this.imageRoute}/Feedback.png`,
      title: "Feedback"
    },
    {
      class: "option3",
      router: "/mentiBrainstormingBuilder",
      image: `${this.imageRoute}/Brainstorming.png`,
      title: "Brainstorming"
    },
    {
      class: "option4",
      router: "/mentiQuizBuilder",
      image: `${this.imageRoute}/Quiz.png`,
      title: "Quiz"
    },
  ]
}
