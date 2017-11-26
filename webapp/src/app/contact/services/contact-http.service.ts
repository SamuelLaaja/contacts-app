import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../contact';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactHttpService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:54628/api/contacts';
  }

  get(): Observable<Contact[]> {
    return this.http.get(this.url).map((response) => {
      return response as Contact[];
    });
  }

  getOne(id: number): Observable<Contact> {
    return this.http.get(this.url + '/' + id).map((response) => {
      return response as Contact;
    });
  }

  add(contact: Contact): Observable<Contact>  {
    return this.http.post(this.url, contact).map((response) => {
      return response as Contact;
    });
  }

  edit(contact: Contact): Observable<any> {
    return this.http.put(this.url, contact);
  }

  del(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
