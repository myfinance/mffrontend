import { Injectable } from '@angular/core';
import { MfClientService } from '@mffrontend/shared/data-access-mfclient';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private tenantservice: MfClientService) { }
}
