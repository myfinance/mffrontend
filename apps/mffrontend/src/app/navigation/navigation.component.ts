import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { MfdataService, SharedDataAccessMfdataModule } from '@mffrontend/shared/data-access-mfdata';
import { AuthService } from 'libs/shared/auth/src/lib/auth.service';

@Component({
  selector: 'mffrontend-navigation',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule, SharedDataAccessMfdataModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  mfdataService: MfdataService;
  authService: AuthService;
  currentZone = "";

  constructor(authService: AuthService, private router: Router, mfdataService: MfdataService) {
     this.mfdataService = mfdataService;
     this.authService = authService;
     this.currentZone = mfdataService.getCurrentZone();
   }

  home() {
    this.router.navigate(['/']);
  }

  tenanteditor() {
    this.router.navigate(['/tenanteditor']);
  }

  assetview() {
    this.router.navigate(['/assetview']);
  }

  handleZoneSelect(identifier: string): void {
    this.mfdataService.setCurrentZone(identifier);
    this.currentZone = identifier;
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.router.navigate(['/logout']);
  }
}
