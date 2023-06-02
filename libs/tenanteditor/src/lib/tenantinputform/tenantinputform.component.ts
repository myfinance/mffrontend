import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MfClientService, SharedDataAccessMfClientModule } from '@mffrontend/shared/data-access-mfclient';

@Component({
  selector: 'mffrontend-tenantinputform',
  standalone: true,
  imports: [CommonModule, SharedDataAccessMfClientModule, ReactiveFormsModule],
  templateUrl: './tenantinputform.component.html',
  styleUrls: ['./tenantinputform.component.scss'],
})
export class TenantinputformComponent {
  instrumentForm= new FormGroup({

    description: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    })

  });

  constructor(private tenantservice: MfClientService) {
  }


  onSubmit() {
    console.log(this.instrumentForm)
    //this.tenantservice.saveTenant(this.instrumentForm.value.description)
  }
}
