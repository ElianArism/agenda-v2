import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ModalService } from './services/modal.service';

// Components
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
// Material
import { MatCardModule } from '@angular/material/card';
import { ModalComponent } from '@components/modal/modal.component';
import { IContact } from './interfaces';

const MATERIAL_MODULES = [MatCardModule];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToolbarComponent, ...MATERIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly modalService: ModalService = inject(ModalService);
  readonly title: string = 'agenda';

  createContact(): Promise<void> {
    this.modalService.openModal<ModalComponent, IContact>(ModalComponent);
    return Promise.resolve();
  }
}
