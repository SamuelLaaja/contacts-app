import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class ErrorMessagesService {

  constructor(public snackBar: MatSnackBar) {}

  public showError(message: string) {
    this.snackBar.open(message, 'OK', {duration: 3000});
  }

}
