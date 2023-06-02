import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { TenantinputformComponent } from '../tenantinputform/tenantinputform.component';
import { TenantupdateformComponent } from '../tenantupdateform/tenantupdateform.component';

@Component({
  selector: 'mffrontend-tenantcontroller',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TenantinputformComponent, TenantupdateformComponent],
  templateUrl: './tenantcontroller.component.html',
  styleUrls: ['./tenantcontroller.component.scss'],
})
export class TenantcontrollerComponent {
  noTenantSelected = true;
}
