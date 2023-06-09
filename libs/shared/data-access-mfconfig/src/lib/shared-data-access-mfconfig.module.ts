import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MfconfigService } from './mfconfig.service';
import { SharedDataAccessMfClientModule } from '@mffrontend/shared/data-access-mfclient';

@NgModule({
  imports: [
    HttpClientModule,
    SharedDataAccessMfClientModule,
    CommonModule],
  providers: [
    MfconfigService
  ]
})
export class SharedDataAccessMfconfigModule {}
