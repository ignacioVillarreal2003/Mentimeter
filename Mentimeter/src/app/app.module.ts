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

import { MentiEndComponent } from './components/menti-end/menti-end.component';

import { FeedbackViewComponent } from './components/feedback/feedback-view/feedback-view.component';
import { MentiFeedbackResultsComponent } from './components/feedback/menti-feedback-results/menti-feedback-results.component';
import { MentiFeedbackBuilderComponent } from './components/feedback/menti-feedback-builder/menti-feedback-builder.component';

import { MentiMultipleChoiceBuilderComponent } from './components/multiple-choice/menti-multiple-choice-builder/menti-multiple-choice-builder.component';
import { MentiMultipleChoiceResultsComponent } from './components/multiple-choice/menti-multiple-choice-results/menti-multiple-choice-results.component';
import { MultipleChoiceViewComponent } from './components/multiple-choice/multiple-choice-view/multiple-choice-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateMentiComponent,
    MainPageComponent,
    OptionsMentiComponent,
    LoginMentiComponent,
    MentiEndComponent,
    FeedbackViewComponent,
    MentiFeedbackResultsComponent,
    MentiFeedbackBuilderComponent,
    MentiMultipleChoiceBuilderComponent,
    MentiMultipleChoiceResultsComponent,
    MultipleChoiceViewComponent
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
