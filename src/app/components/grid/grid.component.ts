import {
  Component,
  OnInit,
  effect,
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
    effect(() => this.applyFilter(), { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.dataSource.data = this.data();
    this.dataSource.sort = this.sort();
    this.dataSource.paginator = this.paginator();
  }

  private applyFilter(): void {
    this.dataSource.filter = this.valueToFilter$().toLocaleLowerCase();
  }
}
