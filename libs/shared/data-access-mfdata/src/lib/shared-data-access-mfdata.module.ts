import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MfdataService } from './mfdata.service';
import { MfClientService } from './mfclient.service';
import { XhrInterceptor } from './xhrinterceptor';
import { AuthService } from './auth.service';
import { MfconfigService } from './mfconfig.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    MfdataService,
    AuthService,
    MfconfigService,
    MfClientService,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }
  ]
})
export class SharedDataAccessMfdataModule {}
