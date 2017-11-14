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
  hover = false;

  constructor() {
    this.contactDelete = new EventEmitter();
  }

  ngOnInit() {
  }

  delContact(contact: Contact) {
    this.contactDelete.emit(contact);
  }
}
