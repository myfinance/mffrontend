import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PortfolioAnalysisViewService } from '../portfolio-analysis-view.service';
import { Position } from '../../shared/data-access-mfdata/model/position';

@Component({
  selector: 'app-depot-overview',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './depot-overview.component.html',
  styleUrl: './depot-overview.component.scss'
})
export class DepotOverviewComponent {
  positions: Position[] = [];


  constructor(private service: PortfolioAnalysisViewService) {
    this.service.portfolioEventSubject.subscribe({
      next:
        () => this.positions=this.service.getPositions().filter(p=> p.amount!==0),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.positions=this.service.getPositions()
  }
}
