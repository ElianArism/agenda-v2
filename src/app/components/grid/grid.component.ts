import { Component, OnInit, input } from '@angular/core';

// Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

const MATERIAL_MODULES = [MatTableModule];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [...MATERIAL_MODULES],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent<T> implements OnInit {
  /**
   * NOTE: old way to declare input properties:
   * @Input() displayedColumns: string[];
   * This is the new way to do it
   */
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  dataSource = new MatTableDataSource<T>();

  ngOnInit(): void {
    console.log(this.data());
    this.dataSource.data = this.data();
  }
}
