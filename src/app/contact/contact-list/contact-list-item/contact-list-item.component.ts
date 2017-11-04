import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../../contact';


@Component({
  selector: 'ca-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent implements OnInit {

  @Input() contact: Contact;
  @Output() contactSelected: EventEmitter<Contact>;
  @Output() contactDelete: EventEmitter<Contact>;

  constructor() {
    this.contactSelected = new EventEmitter();
    this.contactDelete = new EventEmitter();
  }

  ngOnInit() {
  }

  selContact(contact: Contact) {
    this.contactSelected.emit(contact);
  }

  delContact(contact: Contact) {
    this.contactDelete.emit(contact);
  }
}
