import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'mffrontend-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(public authService: AuthService) { }
}
