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

  login() {
    window.location.href = 
      'http://localhost:30024/realms/myfinance/protocol/openid-connect/auth?response_type=code&scope=openid%20write%20read&client_id=mfclient&redirect_uri=http://localhost:4200';
    }

}
