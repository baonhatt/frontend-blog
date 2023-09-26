import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public authService: AuthService, public router: Router, private storage: StorageService) {}


  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      var token = this.storage.isLoggedIn();
    if (token) {
      if (_state.url == '/login') {
        this.router.navigate(['/home']);
        return true;
      }
      return true;
    } else {
      if (_next.data['requiredAuth'] == true) {
        this.router.navigate(['/login']);
        // this.toastr.warning('Please login to perform this function!');
        return false;
      }
      return true;
    }
  }

}
