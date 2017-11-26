import { Injectable } from '@angular/core';
import {Contact} from '../contact';

@Injectable()
export class ContactLocalStorageService {

  private contacts: Contact[];
  localStorageKey: string;

  constructor() {
    this.localStorageKey = 'contactStorage';
    this.initializeKey();
    this.contacts = this.readKey();
  }

  defaultContacts() {
    this.saveContact( new Contact( 0, 'Yrjänä', 'Ykkönen', '3045857123', 'Keijokatu 1 as 1', 'Kaupunkila'));
    this.saveContact( new Contact( 0, 'Kaaleppi', 'Kakkonen', '4045857125', 'Keijokatu 1 as 2', 'Kaupunkila'));
    this.saveContact( new Contact( 0, 'Kontio', 'Kolmonen', '5045857125', 'Keijokatu 1 as 3', 'Kaupunkila'));
  }

  // Creates empty key [] if no contacts found. Prevents later errors.
  initializeKey() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  writeKey(contacts: Contact[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
  }

  readKey(): Contact[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey)) as Contact[];
  }

  findContacts (): Contact[] {
    this.contacts = this.readKey();
    return this.contacts;
  }

// No lodash for now.
  findContactById (id: number): Contact {
    this.contacts = this.readKey();
    for (let i = 0, len = this.contacts.length; i < len; i++) {
      if (this.contacts[i].id === id) {
        return this.contacts[i];
      }
    }
  }

  editContact (contact: Contact) {
    this.contacts = this.readKey();
    for (let i = 0, len = this.contacts.length; i < len; i++) {
      if (this.contacts[i].id === contact.id) {
        this.contacts[i] = contact;
        break;
      }
    }
    this.writeKey(this.contacts);
  }

  deleteContact (id: number) {
    for (let i = 0, len = this.contacts.length; i < len; i++) {
      if (this.contacts[i].id === id) {
        this.contacts.splice(i, 1);
        this.writeKey(this.contacts);
        break;
      }
    }
  }

  saveContact (contact: Contact) {
    contact.id = this.contacts.length + 1;
    this.contacts.push(contact);
    this.writeKey(this.contacts);
  }
}
