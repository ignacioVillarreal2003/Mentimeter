import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateMentiComponent } from './components/create-menti/create-menti.component';
import { OptionsMentiComponent } from './components/options-menti/options-menti.component';
import { LoginMentiComponent } from './components/login-menti/login-menti.component';

import { MentiEndComponent } from './components/menti-end/menti-end.component';

import { FeedbackViewComponent } from './components/feedback/feedback-view/feedback-view.component';
import { MentiFeedbackResultsComponent } from './components/feedback/menti-feedback-results/menti-feedback-results.component';
import { MentiFeedbackBuilderComponent } from './components/feedback/menti-feedback-builder/menti-feedback-builder.component';

import { MentiMultipleChoiceBuilderComponent } from './components/multiple-choice/menti-multiple-choice-builder/menti-multiple-choice-builder.component';
import { MentiMultipleChoiceResultsComponent } from './components/multiple-choice/menti-multiple-choice-results/menti-multiple-choice-results.component';
import { MultipleChoiceViewComponent } from './components/multiple-choice/multiple-choice-view/multiple-choice-view.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'loginMenti', component: LoginMentiComponent },
  { path: 'createMenti', component: CreateMentiComponent },
  { path: 'optionsMenti', component: OptionsMentiComponent },

  { path: 'mentiEnd', component: MentiEndComponent },

  { path: 'mentiFeedbackBuilder', component: MentiFeedbackBuilderComponent },
  { path: 'mentiFeedbackResults', component: MentiFeedbackResultsComponent },
  { path: 'feedbackView', component: FeedbackViewComponent },

  { path: 'mentiMultipleChoiceBuilder', component: MentiMultipleChoiceBuilderComponent },
  { path: 'mentiMultipleChoiceResults', component: MentiMultipleChoiceResultsComponent },
  { path: 'multipleChoiceView', component: MultipleChoiceViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
