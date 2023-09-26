import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { tokenModel } from '../model/token.model';
const TOKEN = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public deleteToken(): boolean {
    try {
      if (localStorage.getItem(TOKEN)) {
        localStorage.removeItem(TOKEN);
      }
      return true;
    } catch {}
    return false;
  }

  public setToken(token: tokenModel): boolean {
    try {
      localStorage.removeItem(TOKEN);
      localStorage.setItem(TOKEN, JSON.stringify(token));
      return true;
    } catch {
      return false;
    }
  }

  public getToken(): tokenModel | null {
    const tokenLocalStorage = localStorage.getItem(TOKEN);
    if (tokenLocalStorage) {
      let token = JSON.parse(tokenLocalStorage) as tokenModel;
      return token;
    }
    return null;
  }

  public getAccessToken(): string {
    const tokenLocalStorage = localStorage.getItem(TOKEN);
    if (tokenLocalStorage) {
      let token = JSON.parse(tokenLocalStorage) as tokenModel;
      return token.accessToken;
    }
    return '';
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      return true;
    }
    return false;
  }
}
