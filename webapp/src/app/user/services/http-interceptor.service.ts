import {Injectable, ReflectiveInjector} from '@angular/core';
import {
  HttpErrorResponse, HttpEvent,
  HttpHandler, HttpInterceptor, HttpRequest, HttpSentEvent
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Token} from '../../auth/token';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ErrorMessagesService} from './error-messages.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private errors: ErrorMessagesService) {
  }

  getToken(): Token {
    return JSON.parse(localStorage.getItem('ca-loggedInUser'));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent> {
    const token = this.getToken();
    if (token) {
      const request = req.clone({
        setHeaders: {Authorization: token.token_type + ' ' + token.access_token}
      });
      return this.handleHttpRequest(request, next);
    }
    return this.handleHttpRequest(req, next);
  }


  private handleHttpRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch((response: HttpErrorResponse) => {

      if (response.status === 401) {
        // Unauthorized access: Invalid Token response.
        this.errors.showError('Access denied: Wrong username/password.');
      } else if (response.status === 0) {
        // Back-end server is currently offline.
        this.errors.showError('Server did not respond.');
      } else {
        this.errors.showError('Something went wrong.');
      }

      return Observable.throw(response);
    });
  }

}
