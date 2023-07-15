import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'mffrontend-login',
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
