import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfClientService } from './mfclient.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule],
  providers: [
    MfClientService
  ]
})
export class SharedDataAccessMfClientModule {}
