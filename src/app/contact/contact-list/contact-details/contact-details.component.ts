import {Component, ElementRef, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ContactService} from '../../services/contact.service';
import {Contact} from '../../contact';

@Component({
  selector: 'ca-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;
  mapFrameElement: ElementRef;
  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ContactService) {
  }

    // Creates empty form from empty Contact object if id is not found. Used when creating a new contact.
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contact = this.service.findContactById(id);
    if (!this.contact) {
      this.contact = new Contact(0);
    }
  }

  newContact(contact: Contact) {
    this.service.saveContact(this.contact.firstName,
      this.contact.lastName, this.contact.phone,
      this.contact.streetAddress, this.contact.city);
    this.router.navigate(['/contacts']);
  }

  editContact(contact: Contact) {
    this.service.editContact(this.contact);
    this.router.navigate(['/contacts']);
  }

  goToContactList() {
    this.router.navigate(['/contacts']);
  }

  refreshMapFrame() {
    setTimeout(() => {
      const mapFrame = this.mapFrameElement.nativeElement;
      mapFrame.src = 'https://maps.google.com/maps?q=' + this.contact.streetAddress + ',' + this.contact.city + '&output=embed';
    });
  }
}
