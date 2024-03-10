import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateMentiComponent } from './components/create-menti/create-menti.component';
import { OptionsUserComponent } from './components/options-user/options-user.component';
import { EndComponent } from './components/end/end.component';

import { FeedbackViewComponent } from './components/menti-view/feedback-view/feedback-view.component';
import { MentiFeedbackResultsComponent } from './components/menti-results/menti-feedback-results/menti-feedback-results.component';
import { MentiFeedbackBuilderComponent } from './components/menti-builder/menti-feedback-builder/menti-feedback-builder.component';

import { MentiMultipleChoiceBuilderComponent } from './components/menti-builder/menti-multiple-choice-builder/menti-multiple-choice-builder.component';
import { MentiMultipleChoiceResultsComponent } from './components/menti-results/menti-multiple-choice-results/menti-multiple-choice-results.component';
import { MultipleChoiceViewComponent } from './components/menti-view/multiple-choice-view/multiple-choice-view.component';

import { MentiBrainstormingBuilderComponent } from './components/menti-builder/menti-brainstorming-builder/menti-brainstorming-builder.component';
import { MentiBrainstormingResultsComponent } from './components/menti-results/menti-brainstorming-results/menti-brainstorming-results.component';
import { BrainstormingViewComponent } from './components/menti-view/brainstorming-view/brainstorming-view.component';

import { MentiQuizBuilderComponent } from './components/menti-builder/menti-quiz-builder/menti-quiz-builder.component';
import { MentiQuizResultsComponent } from './components/menti-results/menti-quiz-results/menti-quiz-results.component';
import { QuizViewComponent } from './components/menti-view/quiz-view/quiz-view.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'createMenti', component: CreateMentiComponent },
  { path: 'optionsUser', component: OptionsUserComponent },
  { path: 'end', component: EndComponent },

  { path: 'mentiFeedbackBuilder', component: MentiFeedbackBuilderComponent },
  { path: 'mentiFeedbackResults', component: MentiFeedbackResultsComponent },
  { path: 'feedbackView', component: FeedbackViewComponent },

  { path: 'mentiMultipleChoiceBuilder', component: MentiMultipleChoiceBuilderComponent },
  { path: 'mentiMultipleChoiceResults', component: MentiMultipleChoiceResultsComponent },
  { path: 'multipleChoiceView', component: MultipleChoiceViewComponent },

  { path: 'mentiBrainstormingBuilder', component: MentiBrainstormingBuilderComponent },
  { path: 'mentiBrainstormingResults', component: MentiBrainstormingResultsComponent },
  { path: 'brainstormingView', component: BrainstormingViewComponent },

  { path: 'mentiQuizBuilder', component: MentiQuizBuilderComponent },
  { path: 'mentiQuizResults', component: MentiQuizResultsComponent },
  { path: 'quizView', component: QuizViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
