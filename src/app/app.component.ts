import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ContactService} from './contact/services/contact.service';

@Component({
  selector: 'ca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private router: Router, private service: ContactService) {}

  // Quick way to add placeholder users. Remove when publishing
  defaultContacts() {
    this.service.defaultContacts();
  }
}
