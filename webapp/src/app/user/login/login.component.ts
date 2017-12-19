import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'ca-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  passWord: string;

  constructor( private auth: AuthenticationService ) {
  }

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.auth.login(username, password);
  }

}
