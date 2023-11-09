import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Instrument } from '@mffrontend/shared/data-access-mfdata';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'mffrontend-tenantupdateform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenantupdateform.component.html',
  styleUrls: ['./tenantupdateform.component.scss'],
})
export class TenantupdateformComponent implements OnInit {
  noTenantSelected = true;
  selectedTenant: Instrument | undefined;
  tenantForm: FormGroup = new FormGroup({
    'description': new FormControl('', Validators.required),
    'active': new FormControl(false, Validators.required)
  });

  constructor(private tenantservice: TenantService) { }

  ngOnInit() {
    this.tenantservice.newTenantSelectedSubject.subscribe(
      () => {
        this.updateSelectedTenant()
      }
    )
  }

  updateSelectedTenant() {
    this.selectedTenant = this.tenantservice.selectedTenant
    if (this.selectedTenant) {
      this.noTenantSelected = false;
      this.tenantForm.get('description')?.setValue(this.selectedTenant.description);
      this.tenantForm.get('active')?.setValue(this.selectedTenant.active);
    }

  }

  getSelectedTenantId(): string {
    if (!this.selectedTenant) { return ''; } else { return this.selectedTenant.businesskey; }
  }

  onSubmit() {
    console.log(this.tenantForm);
    if(this.tenantForm.touched) {
      console.log('touched');
      this.tenantservice.updateTenant(this.tenantForm.value.active, this.tenantForm.value.description );
    } else {
      console.log('untouched');
    }
  }
}