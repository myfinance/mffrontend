import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-equity-metrics-editor',
  standalone: true,
  imports: [Button, CalendarModule, FormsModule, SidebarModule],
  templateUrl: './equity-metrics-editor.component.html',
  styleUrl: './equity-metrics-editor.component.scss'
})
export class EquityMetricsEditorComponent {
  sidebarVisible = false;
}
