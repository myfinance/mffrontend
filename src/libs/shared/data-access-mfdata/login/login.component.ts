import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MfdataService } from '../mfdata.service';

@Component({
  selector: 'mffrontend-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  
  loginForm= new FormGroup({

    user: new FormControl<string>('', {
      nonNullable: true
    }),

    password: new FormControl<string>('', {
      nonNullable: true
    })

  });
  constructor(private dataService: MfdataService) { }

  onSubmit() {
    this.dataService.login(this.loginForm.value.user!, this.loginForm.value.password!);
  }
}
