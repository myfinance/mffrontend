import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';

import { MfdataService } from './mfdata.service';
import { MfClientService } from './mfclient.service';
import { XhrInterceptor } from './xhrinterceptor';
import { MfconfigService } from './mfconfig.service';
import { Instrument } from './model/instrument';

@NgModule({
  imports: [CommonModule],
  providers: [
    //MfdataService,
    //MfconfigService,
    //MfClientService,
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }
  ]
})
export class SharedDataAccessMfdataModule {}

export { MfdataService, Instrument };
