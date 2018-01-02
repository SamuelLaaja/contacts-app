import {Injectable} from '@angular/core';
import {
  HttpHandler, HttpInterceptor, HttpRequest, HttpSentEvent
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Token} from '../../auth/token';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {
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
      return next.handle(request);
    }
    return next.handle(req);
  }
}
