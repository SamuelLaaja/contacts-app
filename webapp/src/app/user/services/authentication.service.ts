import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  constructor() { }

  login (userName: string, passWord: string) {
  }

  logout () {
  }

  get isAuthenticatedUser () {
    return true;
  }

  getAuthenticatedUser () {
  }

}
