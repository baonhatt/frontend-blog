import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { AuthGuard } from './shared/auth.guard';
import { BlogDetailComponent } from './views/blog-detail/blog-detail.component';
const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent, data: {
    }
  },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      requiredAuth: false,
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
  {
    path: 'blog-detail/:id',
    component: BlogDetailComponent,
    canActivate: [AuthGuard],
    data: {
      requiredAuth: true
    },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
