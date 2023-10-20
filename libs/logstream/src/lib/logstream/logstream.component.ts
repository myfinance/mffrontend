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

  constructor(private websocketService: WebsocketService) { }

  sendMsg(): void {
    this.websocketService.connect().subscribe(
      (message) => {
        console.log('Received message from WebSocket: ', message);
        this.received[2] = this.received[1];
        this.received[1] = this.received[0];
        this.received[0] = message;
      },
      (error) => {
        console.error('Error occurred:', error);
        // Handle errors here
      }
    );
    this.websocketService.sendMessage("test");
  }
}
