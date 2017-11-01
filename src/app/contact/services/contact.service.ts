import { Injectable } from '@angular/core';
import {Contact} from '../contact';

@Injectable()
export class ContactService {

  private contacts: Contact[];

  constructor() {
    this.contacts = [];
    this.saveContact('Yrjänä', 'Ykkönen', '3045857123', 'Keijokatu 1 as 1', 'Kaupunkila');
    this.saveContact('Kaaleppi', 'Kakkonen', '4045857125', 'Keijokatu 1 as 2', 'Kaupunkila');
    this.saveContact('Kontio', 'Kolmonen', '5045857125', 'Keijokatu 1 as 3', 'Kaupunkila');
  }

  findContacts (): Contact[] {
    return this.contacts;
  }

  findContactById (id: number): Contact {
    for (let i = 0, len = this.contacts.length; i < len; i++) {
      if (this.contacts[i].id === id) {
        return this.contacts[i];
      }
    }
  }

  // Returns id number of the added user
  saveContact (firstName: string, lastName: string, phone: string, streetAddress: string, city: string): number {
    const contact = new Contact(this.contacts.length + 1, firstName, lastName, phone, streetAddress, city);
    this.contacts.push(contact);
    return contact.id;
  }

  deleteContact (id: number) {
    for (let i = 0, len = this.contacts.length; i < len; i++) {
      if (this.contacts[i].id === id) {
        this.contacts.splice(i, 1);
      }
    }
  }
}
