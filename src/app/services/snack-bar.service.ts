import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({ providedIn: 'root' })
export class SnackBarService {
  private readonly snackBar = inject(MatSnackBar);

  showSnackBar(message: string, action = 'OK'): void {
    this.snackBar.open(message, action, { duration: 3000 });
  }
}
