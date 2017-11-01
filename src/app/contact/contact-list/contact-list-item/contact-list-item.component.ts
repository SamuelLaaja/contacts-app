import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../contact';
// import {ContactService} from '../../services/contact.service';

@Component({
  selector: 'ca-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent implements OnInit {

  contacts: Contact[];
  @Input() contact: Contact;

  constructor() { }

  ngOnInit() {
  }

  delContact() {
    // this.contactService.deleteContact(this.contact.id);
  }
}
