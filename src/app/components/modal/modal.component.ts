import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Material
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, MatDialogModule];
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, ...MATERIAL_MODULES],
  templateUrl: 'modal.component.html',
  styles: ``,
})
export class ModalComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);

  contactForm: FormGroup = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    phone: [0, [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: {
      data: { name: string; email: string; phone: number };
      isEditing?: boolean;
    }
  ) {}

  ngOnInit(): void {
    console.log(this.dialogData);
    if (this.dialogData.isEditing) {
      this.contactForm.patchValue(this.dialogData.data);
      this.contactForm.disable();
    }
  }

  getButtonTitle(): string {
    return this.dialogData.data ? 'Edit Contact' : 'Add Contact';
  }
}
