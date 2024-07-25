import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { BasicLayoutViewComponent } from './basic-layout-view/basic-layout-view.component';
import { SharedDataAccessMfdataModule } from '../libs/shared/data-access-mfdata/shared-data-access-mfdata.module';


@Component({
  standalone: true,
  imports: [
    RouterModule, 
    NavigationComponent, 
    NotFoundViewComponent, 
    BasicLayoutViewComponent, 
    SharedDataAccessMfdataModule
  ],
  selector: 'mffrontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mffrontend';
}
