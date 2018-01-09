import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ContactService} from '../contact/services/contact.service';
import {AuthenticationService} from '../user/services/authentication.service';
import {ErrorMessagesService} from '../user/services/error-messages.service';

@Component({
  selector: 'ca-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  username: string;

  constructor (private router: Router, private service: ContactService, private auth: AuthenticationService, private errors: ErrorMessagesService) {
  }

  ngOnInit() {
    this.username = this.auth.getAuthenticatedUser;
  }

  // Quick way to add placeholder users. Remove when publishing
  defaultContacts() {
    this.service.defaultContacts();
  }

  logOut() {
    this.router.navigate(['/login']);
    this.errors.showError('Logged out.');
  }
}
