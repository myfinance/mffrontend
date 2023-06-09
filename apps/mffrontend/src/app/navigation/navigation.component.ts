import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { MfconfigService, SharedDataAccessMfconfigModule } from '@mffrontend/shared/data-access-mfconfig';

@Component({
  selector: 'mffrontend-navigation',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule, SharedDataAccessMfconfigModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  configService: MfconfigService;
  currentZone = "";

  constructor(private router: Router, configService: MfconfigService) {
     this.configService = configService;
     this.currentZone = configService.getCurrentZone();
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
    this.configService.setCurrentZone(identifier);
    this.currentZone = identifier;
  }
}
