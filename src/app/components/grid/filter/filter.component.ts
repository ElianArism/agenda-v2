import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

// Material
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput];
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, ...MATERIAL_MODULES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-form-field>
      <mat-label> {{ label() }} </mat-label>
      <input
        matInput
        [(ngModel)]="filter"
        type="text"
        placeholder="{{ placeholder() }}"
      />
    </mat-form-field>
  `,
  styles: ``,
})
export class FilterComponent {
  readonly filter = model<string>('');
  readonly placeholder = input<string>('Write something');
  readonly label = input<string>('Filter');
}
