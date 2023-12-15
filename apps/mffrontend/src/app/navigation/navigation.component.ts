import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Instrument, MfdataService, SharedDataAccessMfdataModule } from '@mffrontend/shared/data-access-mfdata';

@Component({
  selector: 'mffrontend-navigation',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule, SharedDataAccessMfdataModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  mfdataService: MfdataService;
  currentZone = "";
  isLoggedIn = false;
  tenants: Instrument[] = [];
  currentTenant?: Instrument;

  constructor(private router: Router, mfdataService: MfdataService) {
    this.mfdataService = mfdataService;
    this.currentZone = mfdataService.getCurrentZone();
    this.mfdataService.getLoginSubject().subscribe(
      () => {
        this.isLoggedIn = mfdataService.isLoggedIn();
        this.loadTenants();
      });
    this.mfdataService.getLogoutSubject().subscribe(
      () => {
        this.isLoggedIn = mfdataService.isLoggedIn();
      });
    this.mfdataService.getInstrumentEventSubject().subscribe(
      () => {
        this.loadTenants();
      }
    )
  }

  loadTenants() {
    this.mfdataService.getTenants().subscribe(
      (instruments) => {
        this.tenants = instruments.filter(i => i.active);
        if(!this.currentTenant &&this.tenants.length>0) {
          this.handleTenantSelect(this.tenants[0])
        }
      }
    )
  }

  home() {
    this.router.navigate(['/']);
  }

  tenanteditor() {
    this.router.navigate(['/tenanteditor']);
  }

  instrumenteditor() {
    this.router.navigate(['/instrumenteditor']);
  }

  transactioneditor() {
    this.router.navigate(['/transactioneditor']);
  }

  assetview() {
    this.router.navigate(['/assetview']);
  }

  handleZoneSelect(identifier: string): void {
    this.mfdataService.setCurrentZone(identifier);
    this.currentZone = identifier;
  }

  handleTenantSelect(tenant: Instrument): void {
    this.mfdataService.setCurrentTenant(tenant);
    this.currentTenant = tenant;
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.router.navigate(['/logout']);
  }
}
