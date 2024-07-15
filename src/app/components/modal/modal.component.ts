import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

// Material
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ContactsService } from '@features/contacts/contacts.service';
import { IContact } from 'src/app/interfaces';
import { ModalService } from 'src/app/services/modal.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ModalMessages } from './modal-messages.enum';

const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, MatDialogModule];
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, ...MATERIAL_MODULES],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  private readonly snackBarService: SnackBarService = inject(SnackBarService);
  private readonly contactsService: ContactsService = inject(ContactsService);
  private readonly modalService: ModalService = inject(ModalService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  contactForm: FormGroup = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    phone: [0, [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: {
      data: Partial<IContact>;
      isEditing?: boolean;
    }
  ) {}

  ngOnInit(): void {
    if (this.dialogData.isEditing) {
      this.contactForm.patchValue(this.dialogData.data);
    }
  }

  getButtonTitle(): string {
    return this.dialogData.data ? 'Edit Contact' : 'Add Contact';
  }

  async onSubmit(): Promise<void> {
    const contactId: string | undefined = this.dialogData.data?.id;
    let finalMessage: ModalMessages = ModalMessages.CONTACT_CREATED;
    if (this.dialogData.isEditing) {
      await this.contactsService.updateContact(
        <string>contactId,
        this.contactForm.value
      );
      finalMessage = ModalMessages.CONTACT_UPDATED;
    } else {
      await this.contactsService.createContact(this.contactForm.value);
    }
    this.snackBarService.showSnackBar(finalMessage);
    this.modalService.closeModal();
  }
}
