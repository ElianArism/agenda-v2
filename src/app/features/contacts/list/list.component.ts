import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GridComponent } from '@components/grid/grid.component';
import { IContact } from 'src/app/interfaces';
import { ColumnKeys } from 'src/app/types';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [GridComponent],
  template: `
    <section>
      @if(contacts$()) {

      <app-grid
        [displayedColumns]="displayedColumns"
        [sortableColumns]="sortableColumns"
        [data]="contacts$()"
      />

      }
    </section>
  `,
  styles: ``,
})
export class ListComponent implements OnInit {
  private readonly contactsService: ContactsService = inject(ContactsService);
  private readonly destroyRef = inject(DestroyRef);
  readonly displayedColumns: ColumnKeys<IContact> = [
    'id',
    'name',
    'phone',
    'email',
    'action',
  ];
  readonly sortableColumns: ColumnKeys<IContact> = this.displayedColumns.slice(
    0,
    this.displayedColumns.length - 1
  );

  contacts$: WritableSignal<IContact[]> = signal<IContact[]>([]);

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactsService
      .getAllContacts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((contacts) => {
        this.contacts$.set(contacts);
      });
  }
}
