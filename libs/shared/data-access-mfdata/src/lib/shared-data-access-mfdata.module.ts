import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MfdataService } from './mfdata.service';
import { MfconfigService } from './mfconfig.service';
import { MfClientService } from './mfclient.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    MfdataService,
    MfconfigService,
    MfClientService
  ]
})
export class SharedDataAccessMfdataModule {}
