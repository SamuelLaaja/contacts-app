import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from '../contact';

@Pipe({
  name: 'contactAddress'
})
export class ContactAddressPipe implements PipeTransform {

  // Still no lodash ;)
  transform(contact: Contact): string {
    if (contact.streetAddress) {
      return contact.streetAddress + (contact.city ? ', ' + contact.city : '');
    } else {
    return contact.city ? contact.city : '';
    }
  }

}
