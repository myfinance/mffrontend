import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../websocket.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'mffrontend-logstream',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './logstream.component.html',
  styleUrls: ['./logstream.component.scss'],
  providers: [
    WebsocketService
  ],
})
export class LogstreamComponent {
  title = 'socketrv';
  content = '';
  received:string[] = [];
  maxLogSize = 50;

  constructor(private websocketService: WebsocketService) { 
    this.websocketService.webSocketConnectedSubject.subscribe(
      () => {
        this.websocketService.getWebSocketObservable().subscribe({
          next:
            (message) => {
              this.receive(message);
            },
          error:
            (e) => {
              console.error('Error occurred. Not able to receive message from logstream:', e);
            }
          });
      })

  }

  receive(message: string) {
    console.log('Received message from WebSocket: ', message);
    message = this.parseMessage(message);
    this.received.unshift(message);
    if(this.received.length>this.maxLogSize) {
      this.received.pop();
    }
  }

  parseMessage(message: string) : string {
    const messageParts = message.split(':');
    if(messageParts[0] === 'INSTRUMENTEVENT') {
      this.websocketService.triggerInstrumentEvent();
    }
    if(messageParts[0] === 'TRANSACTIONEVENT') {
      this.websocketService.triggerTransactionEvent();
    }
    return message.substring(message.indexOf(':')+1, message.length);
  }
}
