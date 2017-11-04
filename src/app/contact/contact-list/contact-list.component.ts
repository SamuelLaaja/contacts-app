import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact';
import {ContactService} from '../services/contact.service';

@Component({
  selector: 'ca-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  selectedContact: Contact;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contacts = this.contactService.findContacts();
  }


  onSelectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  onDeleteContact(contact: Contact) {
    this.contactService.deleteContact(contact.id);
  }
}
