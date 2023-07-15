import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  declarations: [LoginComponent, LogoutComponent],
  providers: [
    AuthService
  ],
})
export class SharedAuthModule {}
