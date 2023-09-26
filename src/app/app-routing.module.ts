import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ParentsComponent } from './parents/parents.component';
import { ChildComponent } from './child/child.component';
import { LoginComponent } from './views/login/login.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { AuthGuard } from './shared/auth.guard';
const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'reminder',
    component: ChildComponent,
    data: {
      requiredAuth: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: {
      requiredAuth: true
    },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
