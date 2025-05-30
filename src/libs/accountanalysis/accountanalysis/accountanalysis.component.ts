import { Component } from '@angular/core';
import { AccountgraphComponent } from "../accountgraph/accountgraph.component";
import { AccountanalysiscontrollerComponent } from "../accountanalysiscontroller/accountanalysiscontroller.component";
import { AccountcashflowanalysisComponent } from "../accountcashflowanalysis/accountcashflowanalysis.component";

@Component({
  selector: 'app-accountanalysis',
  standalone: true,
  imports: [AccountgraphComponent, AccountanalysiscontrollerComponent, AccountcashflowanalysisComponent],
  templateUrl: './accountanalysis.component.html',
  styleUrl: './accountanalysis.component.scss'
})
export class AccountanalysisComponent {

}
