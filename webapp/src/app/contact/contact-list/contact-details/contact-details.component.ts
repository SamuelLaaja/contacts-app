import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Contact} from '../../contact';
import {DomSanitizer, SafeResourceUrl,} from '@angular/platform-browser';
import {ContactService} from '../../services/contact.service';

@Component({
  selector: 'ca-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;
  showMap: boolean;
  editMap: boolean;
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contactService: ContactService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Creates empty form from empty Contact object if id is not found. Used when creating a new contact.
    if (id === 0) {
      this.contact = new Contact(0);
    } else {
      this.contactService.findContactById(id).subscribe(
        contact => {
          this.contact = contact;
        }
      );
    }

    this.showMap = false;
    this.editMap = false;
  }

  newContact(contact: Contact) {
    this.contactService.newContact(contact);
    this.router.navigate(['/ca/contacts']);
  }

  editContact(contact: Contact) {
    this.contactService.editContact(contact);
    this.router.navigate(['/ca/contacts']);
  }

  goToContactList() {
    this.router.navigate(['/ca/contacts']);
  }

  getMapUrl(): SafeResourceUrl {
    const url = 'https://www.google.com/maps/embed/v1/search?q=' + this.contact.streetAddress + ',' + this.contact.city +
      '&key=AIzaSyCMlTlKF2a7QcEuYyIVoXpOWS2u_M7nfuo&zoom=5';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  toggleMap() {
    this.showMap = !this.showMap;
  }
}
