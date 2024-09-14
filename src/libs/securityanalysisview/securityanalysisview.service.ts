import { Injectable } from "@angular/core";
import { MfdataService } from "../shared/data-access-mfdata/mfdata.service";

@Injectable({
    providedIn: 'root'
  })
  export class SecurityAnalysisViewService {

    constructor(private service: MfdataService) {
    }

    import() {
        this.service.startMarketdataImport();
    }
    
  }