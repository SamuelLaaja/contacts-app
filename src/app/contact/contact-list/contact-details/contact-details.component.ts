import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ContactService} from '../../services/contact.service';
import {Contact} from '../../contact';
// import {ErrorStateMatcher} from '@angular/material';
// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }


@Component({
  selector: 'ca-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;
  // matcher = new MyErrorStateMatcher();
  //
  // customFormControl = new FormControl('', [
  //   Validators.required
  // ]);

  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ContactService) {

  }

  ngOnInit() {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contact = this.service.findContactById(id);
    // change html field values based on this.contact found values.
    if (!this.contact){
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

  gotoContactList() {
    this.router.navigate(['/contacts']);
  }

  // to pass parameter which contact to highlight:
  // gotoHeroes(hero: Hero) {
  //   let heroId = hero ? hero.id : null;
  //   // Pass along the hero id if available
  //   // so that the HeroList component can select that hero.
  //   // Include a junk 'foo' property for fun.
  //   this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  // }




}
