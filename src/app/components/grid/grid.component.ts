import {
  Component,
  OnInit,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ModalMessages } from '@components/modal/modal-messages.enum';
import { ModalComponent } from '@components/modal/modal.component';
import { ContactsService } from '@features/contacts/contacts.service';
import { ModalService } from 'src/app/services/modal.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { FilterComponent } from './filter/filter.component';

const MATERIAL_MODULES = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule,
  MatIconModule,
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [FilterComponent, ...MATERIAL_MODULES],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent<T> implements OnInit {
  private readonly sort = viewChild.required<MatSort>(MatSort);
  private readonly paginator = viewChild.required<MatPaginator>(MatPaginator);

  private readonly contactService: ContactsService = inject(ContactsService);
  private readonly modalService: ModalService = inject(ModalService);
  private readonly snackBarService: SnackBarService = inject(SnackBarService);

  /**
   * NOTE: old way to declare input properties:
   * @Input() displayedColumns: string[];
   * This is the new way to do it
   */
  displayedColumns = input.required<string[]>();
  sortableColumns = input.required<string[]>();
  data = input.required<T[]>();
  dataSource = new MatTableDataSource<T>();
  valueToFilter$ = signal<string>('');

  constructor() {
    /**
     * Effects are functions that execute instructions when one or more signals change.
     * Use it to handle secondary effects, like DOM updates or HTTP requests
     */
    effect(
      () => {
        // This method is used for filter the table items
        this.applyFilter();

        // Rewrite the table items when one is created
        if (this.data()) {
          this.dataSource.data = this.data();
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.dataSource.data = this.data();
    this.dataSource.sort = this.sort();
    this.dataSource.paginator = this.paginator();
  }

  editElement(element: T): void {
    this.modalService.openModal<ModalComponent, T>(
      ModalComponent,
      element,
      true
    );
  }

  async deleteElement(id: string): Promise<void> {
    const confirmed = confirm(ModalMessages.CONFIRMATION_PROMPT);
    if (confirmed) {
      await this.contactService.deleteContact(id);
      this.snackBarService.showSnackBar(ModalMessages.CONTACT_DELETED);
    } else {
      this.snackBarService.showSnackBar(ModalMessages.OPERATION_STOPPED);
    }
  }

  private applyFilter(): void {
    this.dataSource.filter = this.valueToFilter$().toLocaleLowerCase();
  }
}
