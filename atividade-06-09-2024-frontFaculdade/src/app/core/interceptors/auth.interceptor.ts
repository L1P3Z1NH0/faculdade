import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !req.headers.has('Content-Type') &&
      !req.headers.has('remove-content-type')
    ) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }
    if (req.url !== 'http://15.229.230.153:3001/refresh')
      req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          this.authService.logout();
          return throwError(() => error);
        }

        return throwError(() => error);
      })
    );
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    let modifiedReq = request.clone();

    const token = this.authService.getAccessToken();
    if (!token) return request;

    modifiedReq = modifiedReq.clone({
      setHeaders: { authorization: `Bearer ${token}` },
    });
    return modifiedReq;
  }
}
