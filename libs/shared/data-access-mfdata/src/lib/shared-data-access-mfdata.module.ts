import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MfdataService } from './mfdata.service';
import { MfconfigService } from './mfconfig.service';
import { MfClientService } from './mfclient.service';
import { SharedAuthModule } from '@mffrontend/shared/auth';
import { XhrInterceptor } from './xhrinterceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule, SharedAuthModule],
  providers: [
    MfdataService,
    MfconfigService,
    MfClientService,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }
  ]
})
export class SharedDataAccessMfdataModule {}
