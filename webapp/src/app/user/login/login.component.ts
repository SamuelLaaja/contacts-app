import {Component,OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ca-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  passWord: string;

  constructor(private router: Router, private auth: AuthenticationService) {
  }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    this.auth.login(username, password).subscribe(
      loginResult => {
    console.log(loginResult);
    // palauttaa tokenin ja tilpehoorit, mites sitten?
    this.router.navigate(['/contacts']);
  });
  }

}

//
// this.contactHttpService.add(contact).subscribe(
//   // if success, cache add
//   newContact => {
//     this.contacts.push(newContact);
//   }, (err: HttpErrorResponse) => {
//     if (err.error instanceof Error) {
//       // A client-side or network error occurred.
//       console.log('An error occurred:', err.error.message);
//     } else {
//       // The backend returned an unsuccessful response code.
//       console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
//     }
//   });
