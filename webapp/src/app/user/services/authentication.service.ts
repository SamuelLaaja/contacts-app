import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {User} from '../user';

@Injectable()
export class AuthenticationService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.endpointUrl + '/auth';
  }

  login (userName: string, passWord: string): Observable<any>  {
    const user = new User('', '', userName, passWord);
      return this.http.post(this.url, user);
  }

  logout () {
  }

  get isAuthenticatedUser () {
    return true;
  }

  getAuthenticatedUser () {
  }

}
