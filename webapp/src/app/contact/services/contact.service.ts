import {Injectable} from '@angular/core';
// import {ContactLocalStorageService} from './contact-local-storage.service';
import {Contact} from '../contact';
import {ContactHttpService} from './contact-http.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ContactService {

  private contacts: Contact[];

  constructor(
    // private localStorage: ContactLocalStorageService,
    private contactHttpService: ContactHttpService) {
    this.contacts = [];
  }

  findContacts(reload?: boolean): Observable<Contact[]> {

    if (!this.contacts.length || reload) {

      return this.contactHttpService.get().map((contacts) => {
        this.contacts = contacts;
        return contacts;
      });

    } else {
      return Observable.of(this.contacts);
    }
  }

  findContactById(id: number): Observable<Contact> {
    let cached: Contact = null;
    for (let i = 0, len = this.contacts.length; i < len; i++) {
      if (this.contacts[i].id === id) {
        cached = this.contacts[i];
        break;
      }
    }
    if (cached) {
      return Observable.of(cached);
    } else {
      return this.contactHttpService.getOne(id).map((contact) => {
        if (contact != null) {
          this.contacts.push(contact);
        }
        return contact;
      });
    }
  }

  defaultContacts() {
    this.newContact( new Contact( 0, 'Yrjänä', 'Ykkönen', '3045857123', 'Keijokatu 1 as 1', 'Kaupunkila'));
    this.newContact( new Contact( 0, 'Kaaleppi', 'Kakkonen', '4045857125', 'Keijokatu 1 as 2', 'Kaupunkila'));
    this.newContact( new Contact( 0, 'Kontio', 'Kolmonen', '5045857125', 'Keijokatu 1 as 3', 'Kaupunkila'));
  }

  newContact(contact: Contact) {
    // backend add
    this.contactHttpService.add(contact).subscribe(
      // if success, cache add
      newContact => {
        this.contacts.push(newContact);
      }
    );
  }

  editContact(contact: Contact) {
    // backend edit
    this.contactHttpService.edit(contact).subscribe(
      (response) => {
        // if success, cache edit
        for (let i = 0, len = this.contacts.length; i < len; i++) {
          if (this.contacts[i].id === contact.id) {
            this.contacts[i] = contact;
            break;
          }
        }
      });
  }

  deleteContact(id: number) {
    // backend delete
    this.contactHttpService.del(id).subscribe(
    // if success, cache delete
      (response) => {
        for (let i = 0, len = this.contacts.length; i < len; i++) {
          if (this.contacts[i].id === id) {
            this.contacts.splice(i, 1);
            break;
          }
        }
      });
  }
}
