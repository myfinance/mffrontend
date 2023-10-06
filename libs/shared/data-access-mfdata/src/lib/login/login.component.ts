import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  constructor(public authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.loginForm.value.user!, this.loginForm.value.password!);
  }
}
