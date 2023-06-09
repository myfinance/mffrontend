import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantviewComponent } from '../tenantview/tenantview.component';
import { TenantcontrollerComponent } from '../tenantcontroller/tenantcontroller.component';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'mffrontend-tenanteditor',
  standalone: true,
  imports: [CommonModule, TenantviewComponent, TenantcontrollerComponent],
  providers: [
    TenantService
  ],
  templateUrl: './tenanteditor.component.html',
  styleUrls: ['./tenanteditor.component.scss'],
})
export class TenanteditorComponent {}
