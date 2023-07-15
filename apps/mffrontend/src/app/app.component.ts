import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { BasicLayoutViewComponent } from './basic-layout-view/basic-layout-view.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedAuthModule } from '@mffrontend/shared/auth';

@Component({
  standalone: true,
  imports: [
    RouterModule, 
    NavigationComponent, 
    NotFoundViewComponent, 
    BasicLayoutViewComponent, 
    HttpClientModule,
    SharedAuthModule
  ],
  selector: 'mffrontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mffrontend';
}
