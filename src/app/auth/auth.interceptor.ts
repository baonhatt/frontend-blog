
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private http: HttpClient) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the Authorization header with the token
    request = this.addToken(request);

    // Pass the request through the next interceptor or HttpHandler
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Token is expired or invalid
          if (this.isRefreshing) {
            // If refresh token is already in progress, wait for it to complete
            return this.refreshTokenSubject.pipe(
              filter((result) => result !== null),
              take(1),
              switchMap(() => {
                return next.handle(this.addToken(request));
              })
            );
          } else {
            // Initiate token refresh
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            // Call your API to refresh the token here
            // Example: Replace 'your-refresh-token-endpoint' with your actual refresh token endpoint
            return this.callRefreshTokenEndpoint().pipe(
              switchMap((newToken: any) => {
                if (newToken) {
                  localStorage.setItem('refresh_token', newToken.access_token);
                  // localStorage.setItem('refresh_token', newToken.refresh_token);
                  this.refreshTokenSubject.next(newToken);
                  return next.handle(this.addToken(request));
                } else {
                  // If token refresh fails, log out the user or handle it as needed
                  // Example: AuthService.logout();
                  return throwError('Token refresh failed.');
                }
              }),
              catchError((err) => {
                // Handle refresh token error
                // Example: AuthService.logout();
                return throwError('Token refresh failed.');
              }),
              finalize(() => {
                this.isRefreshing = false;
              })
            );
          }
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = localStorage.getItem('refresh_token');
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }

  private callRefreshTokenEndpoint(): Observable<any> {
    // Call your refresh token API endpoint here
    // Replace 'your-refresh-token-endpoint' with your actual refresh token endpoint
    return this.http.post('http://localhost:3000/auth/refresh-token', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
  }
}
