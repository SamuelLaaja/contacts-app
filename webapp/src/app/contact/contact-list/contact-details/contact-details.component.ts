import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ContactService} from '../../services/contact.service';
import {Contact} from '../../contact';
import {DomSanitizer, SafeResourceUrl,} from '@angular/platform-browser';

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
              private service: ContactService,
              private sanitizer: DomSanitizer) {
  }

  // Creates empty form from empty Contact object if id is not found. Used when creating a new contact.
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contact = this.service.findContactById(id);
    if (!this.contact) {
      this.contact = new Contact(0);
    }
    this.showMap = false;
    this.editMap = false;
  }

  newContact(contact: Contact) {
    this.service.saveContact(contact.firstName,
      contact.lastName, contact.phone,
      contact.streetAddress, contact.city);
    this.router.navigate(['/contacts']);
  }

  editContact(contact: Contact) {
    this.service.editContact(contact);
    this.router.navigate(['/contacts']);
  }

  goToContactList() {
    this.router.navigate(['/contacts']);
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
