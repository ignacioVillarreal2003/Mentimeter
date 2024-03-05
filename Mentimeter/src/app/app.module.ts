import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationInterceptor } from './interceptor/authentication.interceptor';

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
@NgModule({
  declarations: [
    AppComponent,
    CreateMentiComponent,
    MainPageComponent,
    OptionsMentiComponent,
    LoginMentiComponent,
    FeedbackViewComponent,
    FeedbackEndComponent,
    MentiFeedbackResultsComponent,
    MentiFeedbackBuilderComponent,/*
    MultipleChoiceEndComponent,
    MultipleChoiceMentiComponent,
    MultipleChoiceResultsMentiComponent,
    MultipleChoiceViewComponent*/
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
