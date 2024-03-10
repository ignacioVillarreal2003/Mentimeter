import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationInterceptor } from './interceptor/authentication.interceptor';

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

@NgModule({
  declarations: [
    AppComponent,
    CreateMentiComponent,
    MainPageComponent,
    OptionsUserComponent,
    EndComponent,
    FeedbackViewComponent,
    MentiFeedbackResultsComponent,
    MentiFeedbackBuilderComponent,
    MentiMultipleChoiceBuilderComponent,
    MentiMultipleChoiceResultsComponent,
    MultipleChoiceViewComponent,
    MentiBrainstormingBuilderComponent,
    MentiBrainstormingResultsComponent,
    BrainstormingViewComponent,
    MentiQuizBuilderComponent,
    MentiQuizResultsComponent,
    QuizViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    Location
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
