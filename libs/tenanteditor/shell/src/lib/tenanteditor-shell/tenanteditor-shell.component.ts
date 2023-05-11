import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenanteditorFeatureTenantviewComponent } from '@mffrontend/tenanteditor/feature-tenantview';
import { TenanteditorFeatureTenantcontrollerComponent } from '@mffrontend/tenanteditor/feature-tenantcontroller';

@Component({
  selector: 'mffrontend-tenanteditor-shell',
  standalone: true,
  imports: [CommonModule, TenanteditorFeatureTenantviewComponent, TenanteditorFeatureTenantcontrollerComponent],
  templateUrl: './tenanteditor-shell.component.html',
  styleUrls: ['./tenanteditor-shell.component.css'],
})
export class TenanteditorShellComponent {}
