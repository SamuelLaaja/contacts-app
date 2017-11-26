import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../../contact';


@Component({
  selector: 'ca-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent implements OnInit {

  @Input() contact: Contact;
  @Output() contactDelete: EventEmitter<Contact>;
  @Output() contactEdit: EventEmitter<Contact>;
  hover = false;

  constructor() {
    this.contactDelete = new EventEmitter();
    this.contactEdit = new EventEmitter();
  }

  ngOnInit() {
  }

  editContact(contact: Contact) {
    this.contactEdit.emit(contact);
  }
  delContact(contact: Contact) {
    this.contactDelete.emit(contact);
  }
}
