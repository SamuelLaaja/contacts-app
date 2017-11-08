import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact';
import {ContactService} from '../services/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ca-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  selectedContact: Contact;

  constructor(private contactService: ContactService,  private router: Router) {
  }

  ngOnInit() {
    this.contacts = this.contactService.findContacts();
  }

  onSelectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  gotoContactDetailsForm(input?: number) {
    const id = input ? input : 0;
    this.router.navigate(['/contacts/' + id]);
  }

  onDeleteContact(contact: Contact) {
    this.contactService.deleteContact(contact.id);
  }
}
