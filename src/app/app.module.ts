import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ChildComponent } from './child/child.component';
import { ParentsComponent } from './parents/parents.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DemodirectiveDirective } from './shared/demodirective.directive';
import { FormControlDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './views/login/login.component';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChildComponent,
    ParentsComponent,
    DemodirectiveDirective,
    LoginComponent,
    UserProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
