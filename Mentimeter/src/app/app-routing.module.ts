import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateMentiComponent } from './components/create-menti/create-menti.component';
import { OptionsMentiComponent } from './components/options-menti/options-menti.component';
import { LoginMentiComponent } from './components/login-menti/login-menti.component';

import { FeedbackViewComponent } from './components/feedback/feedback-view/feedback-view.component';
import { FeedbackEndComponent } from './components/feedback/feedback-end/feedback-end.component';
import { MentiFeedbackResultsComponent } from './components/feedback/menti-feedback-results/menti-feedback-results.component';
import { MentiFeedbackBuilderComponent } from './components/feedback/menti-feedback-builder/menti-feedback-builder.component';

/*
import { MultipleChoiceEndComponent } from './components/multiple-choice/multiple-choice-end/multiple-choice-end.component';
import { MultipleChoiceMentiComponent } from './components/multiple-choice/multiple-choice-menti/multiple-choice-menti.component';
import { MultipleChoiceResultsMentiComponent } from './components/multiple-choice/multiple-choice-results-menti/multiple-choice-results-menti.component';
import { MultipleChoiceViewComponent } from './components/multiple-choice/multiple-choice-view/multiple-choice-view.component';
*/
const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'loginMenti', component: LoginMentiComponent },
  { path: 'createMenti', component: CreateMentiComponent },
  { path: 'optionsMenti', component: OptionsMentiComponent },

  { path: 'mentiFeedbackBuilder', component: MentiFeedbackBuilderComponent },
  { path: 'mentiFeedbackResults', component: MentiFeedbackResultsComponent },
  { path: 'feedbackView', component: FeedbackViewComponent },
  { path: 'feedbackEnd', component: FeedbackEndComponent },
  /*
  { path: 'multipleChoiceMenti', component: MultipleChoiceMentiComponent },
  { path: 'multipleChoiceResultsMenti', component: MultipleChoiceResultsMentiComponent },
  { path: 'multipleChoiceView', component: MultipleChoiceViewComponent },
  { path: 'multipleChoiceEnd', component: MultipleChoiceEndComponent }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
