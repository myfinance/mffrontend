import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfrestserviceService } from './mfrestservice.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule],
  providers: [
    MfrestserviceService
  ]
})
export class SharedDataAccessMfclientModule {}
