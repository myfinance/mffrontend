import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantinputformComponent } from '../tenantinputform/tenantinputform.component';
import { TenantupdateformComponent } from '../tenantupdateform/tenantupdateform.component';
import { TenantService } from '../tenant.service';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'mffrontend-tenantcontroller',
  standalone: true,
  imports: [CommonModule, TabViewModule, TenantinputformComponent, TenantupdateformComponent],
  templateUrl: './tenantcontroller.component.html',
  styleUrls: ['./tenantcontroller.component.scss'],
})
export class TenantcontrollerComponent {
  noTenantSelected = true;

  constructor(private tenantService: TenantService) {

    this.tenantService.newTenantSelectedSubject.subscribe(
      () => {
        if(this.tenantService.getSelectedTenant() == null){
          this.noTenantSelected = true;
        } else {
          this.noTenantSelected = false;
        }
        
      }
    )
  }
}
