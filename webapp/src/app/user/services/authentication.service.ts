import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Token} from '../../auth/token';
import {Credentials} from '../../auth/credentials';

@Injectable()
export class AuthenticationService {

  private url: string;
  public token: Token;
  public currentUser;
  private keyName: string;

  constructor(private http: HttpClient) {
    this.url = environment.endpointUrl + '/auth';
    this.keyName = 'ca-loggedInUser';
    // set token if saved in local storage
    this.token = JSON.parse(localStorage.getItem(this.keyName));
  }

  login (userName: string, passWord: string): Observable<boolean>  {
    const cred = new Credentials(userName, passWord);
      return this.http.post(this.url, cred)
        .map((response: Token) => {
        // Save returning token after ensuring it exists
          const responseToken = (response);
          if (responseToken) {
            // this.token = JSON.parse(responseToken);
            localStorage.setItem(this.keyName, JSON.stringify(response));
            this.currentUser = userName;
            return true;
          }
          this.currentUser = '';
        return false;
        });
  }

  logout () {
    this.token = null;
    this.currentUser = '';
    localStorage.removeItem(this.keyName);
  }

  get isAuthenticatedUser (): boolean {
    const localToken = JSON.parse(localStorage.getItem(this.keyName));
    return (localToken && localToken.access_token);
  }

  get getAuthenticatedUser (): string {
    return this.currentUser;
  }

}
