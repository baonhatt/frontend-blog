import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  userID!: string


  constructor(private http: HttpClient, public router: Router) { }
  ngOnInit(): void {

  }

  //SignUp

  signUp(user: User): Observable<any> {
    let api = `http://localhost:3000/auth/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  //SignIn

  signin(user: User) {
    return this.http.post<any>(`http://localhost:3000/auth/login`, user).subscribe((res: any) => {
      if (res && res.accessToken) {

        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('refresh_token', res.refreshToken);
        if (res && res._id !== undefined) {
          this.currentUser = res;
          console.log(res._id);
          this.userID = res._id
          this.router.navigate(['home']);
        } else {
          // Xử lý trường hợp res.msg hoặc res.msg._id là undefined (nếu cần)
        }
      }
    })
  }
  isTokenValid(): boolean {
    // Thực hiện kiểm tra tính hợp lệ của token ở đây
    // Ví dụ: kiểm tra thời gian hết hạn của token
    const token = localStorage.getItem('access_token');
    if (token) {
      // Giả sử bạn đã lưu thời gian hết hạn của token trong payload của token
      // Thay 'exp' bằng tên thuộc tính thời gian hết hạn thực tế trong token của bạn
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(tokenPayload.exp * 1000); // Chuyển đổi thành mili giây
      const currentDate = new Date();
      return expirationDate > currentDate; // Kiểm tra xem token còn hạn hay không
    }
    return false; // Không có token nào tồn tại
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `http://localhost:3000/auth/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  //Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
