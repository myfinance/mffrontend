import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../websocket.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'mffrontend-logstream',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './logstream.component.html',
  styleUrls: ['./logstream.component.css'],
  providers: [
    WebsocketService
  ],
})
export class LogstreamComponent {
  title = 'socketrv';
  content = '';
  received = ['','',''];

  constructor(private websocketService: WebsocketService) { 
    this.websocketService.connect().subscribe({
      next:
        (message) => {
          this.receive(message);
        },
      error:
        (e) => {
          console.error('Error occurred. Not able to receive message from logstream:', e);
        }
      });
  }

  receive(message: string) {
    console.log('Received message from WebSocket: ', message);
    this.received[2] = this.received[1];
    this.received[1] = this.received[0];
    this.received[0] = message;
  }
}
