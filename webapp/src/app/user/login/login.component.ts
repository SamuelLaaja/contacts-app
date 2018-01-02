import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ca-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  passWord: string;

  constructor(private router: Router, private auth: AuthenticationService) {
  }

  ngOnInit() {
    // Logout initially
    this.auth.logout();
  }

  login(username: string, password: string): void {
    this.auth.login(username, password).subscribe(
      loginResult => {
    if (loginResult === true) {
      this.router.navigate(['/ca/contacts']);
    }
  });
  }

}

