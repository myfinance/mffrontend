import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  selector: 'mffrontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mffrontend';
}
