import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FullCalendarModule } from '@fullcalendar/angular';
import { DemodirectiveDirective } from './shared/demodirective.directive';
import { FormControlDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './views/login/login.component';
import { AuthInterceptor } from '../app/auth/auth.interceptor';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { BlogDetailComponent } from './views/blog-detail/blog-detail.component';
import { HeaderComponent } from './views/header/header.component';
import { LoginModule } from './views/login/login.module';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './views/layout/layout.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DemodirectiveDirective,
    UserProfileComponent,
    BlogDetailComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    LoginModule, // Add the LoginModule here
    RouterModule.forRoot([]),
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
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
