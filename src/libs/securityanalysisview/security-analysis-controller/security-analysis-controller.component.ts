import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { SecurityAnalysisViewService } from '../securityanalysisview.service';

@Component({
  selector: 'app-security-analysis-controller',
  standalone: true,
  imports: [Button],
  templateUrl: './security-analysis-controller.component.html',
  styleUrl: './security-analysis-controller.component.scss'
})
export class SecurityAnalysisControllerComponent {

  constructor(private service: SecurityAnalysisViewService) {
  }

  import(){
    this.service.import();
  }

}
