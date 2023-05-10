import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'mffrontend-basic-layout-view',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent],
  templateUrl: './basic-layout-view.component.html',
  styleUrls: ['./basic-layout-view.component.scss'],
})
export class BasicLayoutViewComponent {}
