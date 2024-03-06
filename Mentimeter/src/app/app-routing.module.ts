import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateMentiComponent } from './components/create-menti/create-menti.component';
import { OptionsMentiComponent } from './components/options-menti/options-menti.component';

import { MentiEndComponent } from './components/menti-end/menti-end.component';

import { FeedbackViewComponent } from './components/menti-view/feedback-view/feedback-view.component';
import { MentiFeedbackResultsComponent } from './components/menti-results/menti-feedback-results/menti-feedback-results.component';
import { MentiFeedbackBuilderComponent } from './components/menti-builder/menti-feedback-builder/menti-feedback-builder.component';

import { MentiMultipleChoiceBuilderComponent } from './components/menti-builder/menti-multiple-choice-builder/menti-multiple-choice-builder.component';
import { MentiMultipleChoiceResultsComponent } from './components/menti-results/menti-multiple-choice-results/menti-multiple-choice-results.component';
import { MultipleChoiceViewComponent } from './components/menti-view/multiple-choice-view/multiple-choice-view.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
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
