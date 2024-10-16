import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { Instrument, MfdataService, SharedDataAccessMfdataModule } from '../../libs/shared/data-access-mfdata/shared-data-access-mfdata.module';
import { LogstreamComponent } from '../../libs/logstream/logstream/logstream.component';

@Component({
  selector: 'mffrontend-navigation',
  standalone: true,
  imports: [CommonModule, MenubarModule, MenuModule, ButtonModule, SharedDataAccessMfdataModule, LogstreamComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  currentZone = "";
  isLoggedIn = false;
  tenants: Instrument[] = [];
  currentTenant?: Instrument;
  items: MenuItem[] = [];

  constructor(private router: Router, private mfdataService: MfdataService) {
    this.currentZone = mfdataService.getCurrentZone();
    this.mfdataService.loginEventSubject.subscribe(
      () => {
        this.isLoggedIn = mfdataService.isLoggedIn();
        this.loadTenants();
      });
    this.mfdataService.getLogoutSubject().subscribe(
      () => {
        this.isLoggedIn = mfdataService.isLoggedIn();
        this.initMenu();
      });
    this.mfdataService.getInstrumentEventSubject().subscribe(
      () => {
        this.loadTenants();
      }
    )
    this.mfdataService.getConfigLoadedSubject().subscribe(
      () => {
        this.initMenu();
      }
    )
  }
  ngOnInit(): void {
    this.initMenu();
  }

  initMenu() {
    this.initStaticMenu();
    this.addSettingsMenu();
    this.addLoginLogoutToMenu();
  }

  addSettingsMenu() {
    const backendConfigItems: MenuItem[] = [];
    this.mfdataService.getConfig().zones.forEach((zone) => {
      if(zone.identifier === this.mfdataService.getConfig().currentZone.identifier){
        backendConfigItems.push({
          label: zone.name,
          icon: 'pi pi-check-circle'
        });
      } else {
        backendConfigItems.push({
          label: zone.name,
          icon: 'pi pi-circle',
          command: () => {
            this.handleZoneSelect(zone.identifier);
          }
        });
      }

    })

    const tenantConfigItems: MenuItem[] = [];
    this.tenants.forEach((t) => {
      if(t.businesskey === this.currentTenant?.businesskey) {
        tenantConfigItems.push({
          label: t.description,
          icon: 'pi pi-check-circle'
        });
      } else {
        tenantConfigItems.push({
          label: t.description,
          icon: 'pi pi-circle',
          command: () => {
            this.handleTenantSelect(t);
          }
        });
      }

    })

    this.items.push({
      label: 'Einstellungen',
      icon: 'pi pi-cog',
      items: [{
        label: 'Backend',
        icon: 'pi pi-database',
        items: backendConfigItems
      },
      {
        label: 'Aktiver Mandant',
        icon: 'pi pi-user',
        items: tenantConfigItems
      },
      {
        label: 'Mandantenpflege',
        icon: 'pi pi-user-edit',
        command: () => {
          this.tenanteditor();
        }
      }
      ]
    });
  }

  addLoginLogoutToMenu(){
    if (this.isLoggedIn) {
      this.items.push({
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        }

      });
    } else {
      this.items.push({
        label: 'Login',
        icon: 'pi pi-sign-in',
        command: () => {
          this.login();
        }
      });
    }
  }

  initStaticMenu() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.home();
        }
      },
      {
        label: 'Dashboards',
        icon: 'pi pi-gauge',
        items: [{
          label: 'Vermögen',
          icon: 'pi pi-euro',
          command: () => {
            this.assetview();
          }
        },
        {
          label: 'Wertpapieranalyse',
          icon: 'pi pi-chart-line',
          command: () => {
            this.securityanalysisview();
          }
        }
        ]
      },
      {
        label: 'Kontoführung',
        icon: 'pi pi-book',
        items: [{
          label: 'Transaktionen',
          icon: 'pi pi-credit-card',
          command: () => {
            this.transactioneditor();
          }
        },
        {
          label: 'Instrumente',
          icon: 'pi pi-hammer',
          command: () => {
            this.instrumenteditor();
          }
        },
        {
          label: 'Ausgabenmassenupload',
          icon: 'pi pi-upload',
          command: () => {
            this.transactionmassload();
          }
        },
        {
          label: 'Dauertransaktionen',
          icon: 'pi pi-replay',
          command: () => {
            this.recurrenttransactioneditor();
          }
        },
        {
          label: 'Preise',
          icon: 'pi pi-dollar',
          command: () => {
            this.priceeditor();
          }
        }
        ]
      }
    ]
  }

  loadTenants() {
    this.tenants = this.mfdataService.getActiveTenants();
    this.handleTenantSelect(this.mfdataService.currentTenant);
    this.initMenu();
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

  transactionmassload() {
    this.router.navigate(['/transactionmassload']);
  }

  recurrenttransactioneditor() {
    this.router.navigate(['/recurrenttransactioneditor']);
  }

  priceeditor() {
    this.router.navigate(['/priceeditor']);
  }

  assetview() {
    this.router.navigate(['/assetview']);
  }

  securityanalysisview() {
    this.router.navigate(['/securityanalysisview']);
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
