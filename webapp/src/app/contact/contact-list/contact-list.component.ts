import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact';
import {Router} from '@angular/router';
import {ContactService} from '../services/contact.service';

@Component({
  selector: 'ca-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  // used for populating contact list. *ngFor="let contact of contacts"
  contacts: Contact[];

  constructor(private contactService: ContactService, private router: Router) {
  }

  // Fills contact list when starting up
  ngOnInit() {
    this.contactService.findContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  // Goes to /contacts/0 if no input is given.
  goToContactDetailsForm(contact?: Contact) {
    const id = contact ? contact.id : 0;
    this.router.navigate(['/ca/contacts/' + id]);
  }

  onDeleteContact(contact: Contact) {
    this.contactService.deleteContact(contact.id);
  }
}
