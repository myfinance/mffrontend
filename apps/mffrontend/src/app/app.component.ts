import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { BasicLayoutViewComponent } from './basic-layout-view/basic-layout-view.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedDataAccessMfdataModule } from '@mffrontend/shared/data-access-mfdata';

@Component({
  standalone: true,
  imports: [
    RouterModule, 
    NavigationComponent, 
    NotFoundViewComponent, 
    BasicLayoutViewComponent, 
    HttpClientModule,
    SharedDataAccessMfdataModule
  ],
  selector: 'mffrontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mffrontend';
}
