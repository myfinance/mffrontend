import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'mffrontend-navigation',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(private router: Router) { }

  home() {
    this.router.navigate(['/']);
  }

  tenanteditor() {
    this.router.navigate(['/tenanteditor']);
  }

  assetview() {
    this.router.navigate(['/assetview']);
  }
}
