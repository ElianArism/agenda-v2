import { Component, output } from '@angular/core';

// Components
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

const MATERIAL_MODULES = [MatIconModule, MatButtonModule, MatToolbarModule];

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [...MATERIAL_MODULES],
  template: ` <mat-toolbar color="primary">
    <a mat-button routerLink="/">
      <mat-icon>home</mat-icon>
      <span> Home </span>
    </a>

    <span class="spacer"></span>

    <a mat-button routerLink="/agenda">
      <mat-icon>list_alt</mat-icon>
      <span> Contacts </span>
    </a>

    <a mat-button (click)="emitAddContactEvent()">
      <mat-icon>add_box</mat-icon>
      <span> Add contact </span>
    </a>
  </mat-toolbar>`,
  styles: ``,
})
export class ToolbarComponent {
  /**
   * NOTE: old way to emit events:
   * @Output() addContactEvent = new EventEmitter<void>();
   * This is the new way to do it
   */
  readonly onAddContact = output<void>();

  emitAddContactEvent(): void {
    this.onAddContact.emit();
  }
}
