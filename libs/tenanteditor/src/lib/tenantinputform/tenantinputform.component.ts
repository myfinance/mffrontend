import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'mffrontend-tenantinputform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tenantinputform.component.html',
  styleUrls: ['./tenantinputform.component.scss'],
})
export class TenantinputformComponent {
  instrumentForm= new FormGroup({

    description: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    })

  });

  constructor(private tenantservice: TenantService) {
  }


  onSubmit() {
    console.log(this.instrumentForm)
    if(this.instrumentForm.value.description!=null) {
      this.tenantservice.saveTenant(this.instrumentForm.value.description);
    };
  }
}
