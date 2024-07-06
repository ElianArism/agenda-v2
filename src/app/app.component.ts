import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Components
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
// Material
import { MatCardModule } from '@angular/material/card';

const MATERIAL_MODULES = [MatCardModule];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToolbarComponent, ...MATERIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly title: string = 'agenda';

  createContact(): Promise<void> {
    console.log('funciona!');
    return Promise.resolve();
  }
}
