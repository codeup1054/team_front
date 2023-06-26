import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'ok', data: any = '') {
    // console.log(data)
    message = message + `<pre>${JSON.stringify(data)}</pre>`
    this._snackBar.open(message, action, {
      duration: 15000,
      verticalPosition: 'top',
    });
  }
}
