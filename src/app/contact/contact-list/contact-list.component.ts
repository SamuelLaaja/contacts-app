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

  constructor(private contactService: ContactService,  private router: Router) {
  }

  // Fills contact list when starting up
  ngOnInit() {
    this.contacts = this.contactService.findContacts();
  }

  // Goes to /contacts/0 if input is not given.
  goToContactDetailsForm(input?: number) {
    const id = input ? input : 0;
    this.router.navigate(['/contacts/' + id]);
  }

  onDeleteContact(contact: Contact) {
    this.contactService.deleteContact(contact.id);
  }
}
