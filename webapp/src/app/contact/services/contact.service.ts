import {Injectable} from '@angular/core';
import {Contact} from '../contact';
import {ContactHttpService} from './contact-http.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ContactService {

  private contacts: Contact[];

  constructor(
    private contactHttpService: ContactHttpService) {
    this.contacts = [];
  }

  biggestID(): number {
    let idCounter = 0;
    for (let i = 0, len = this.contacts.length; i < len; i++) {
      if (this.contacts[i].id > idCounter) {
        idCounter = this.contacts[i].id;
      }
    }
    return idCounter;
  }

  findContacts(reload?: boolean): Observable<Contact[]> {

    if (!this.contacts.length || reload) {

      return this.contactHttpService.get().map((contacts) => {
        this.contacts = contacts;
        return contacts;
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
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
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
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
      }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    });
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
      }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
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
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });
  }
}
