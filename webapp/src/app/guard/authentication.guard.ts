import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../user/services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // redirect non-authenticated users to login screen
    if (!this.auth.isAuthenticatedUser) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
