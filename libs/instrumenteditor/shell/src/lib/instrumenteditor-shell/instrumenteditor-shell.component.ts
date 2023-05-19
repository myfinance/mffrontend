import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TenanteditorFeatureTenantcontrollerComponent } from '@mffrontend/tenanteditor/feature-tenantcontroller'

@Component({
  selector: 'mffrontend-instrumenteditor-shell',
  standalone: true,
  imports: [CommonModule, TenanteditorFeatureTenantcontrollerComponent],
  templateUrl: './instrumenteditor-shell.component.html',
  styleUrls: ['./instrumenteditor-shell.component.css'],
})
export class InstrumenteditorShellComponent {

}
