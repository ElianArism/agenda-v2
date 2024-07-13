import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly dialog = inject(MatDialog);

  closeModal(): void {
    this.dialog.closeAll();
  }

  openModal<CT, T>(
    modalRef: ComponentType<CT>,
    data?: T,
    isEditing: boolean = false
  ): void {
    const config = { data, isEditing };
    this.dialog.open(modalRef, { data: config, width: '600px' });
  }
}
