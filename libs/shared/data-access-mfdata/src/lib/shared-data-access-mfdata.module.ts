import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MfdataService } from './mfdata.service';
import { MfconfigService } from './mfconfig.service';
import { MfClientService } from './mfclient.service';
import { SharedAuthModule } from '@mffrontend/shared/auth';

@NgModule({
  imports: [CommonModule, HttpClientModule, SharedAuthModule],
  providers: [
    MfdataService,
    MfconfigService,
    MfClientService
  ]
})
export class SharedDataAccessMfdataModule {}
