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

import { MentiEndComponent } from './components/menti-end/menti-end.component';

import { FeedbackViewComponent } from './components/menti-view/feedback-view/feedback-view.component';
import { MentiFeedbackResultsComponent } from './components/menti-results/menti-feedback-results/menti-feedback-results.component';
import { MentiFeedbackBuilderComponent } from './components/menti-builder/menti-feedback-builder/menti-feedback-builder.component';

import { MentiMultipleChoiceBuilderComponent } from './components/menti-builder/menti-multiple-choice-builder/menti-multiple-choice-builder.component';
import { MentiMultipleChoiceResultsComponent } from './components/menti-results/menti-multiple-choice-results/menti-multiple-choice-results.component';
import { MultipleChoiceViewComponent } from './components/menti-view/multiple-choice-view/multiple-choice-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateMentiComponent,
    MainPageComponent,
    OptionsMentiComponent,
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
