import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../websocket.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'mffrontend-logstream',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MessagesModule, ToastModule, DialogModule, ButtonModule],
  templateUrl: './logstream.component.html',
  styleUrls: ['./logstream.component.scss'],
  providers: [
    WebsocketService,
    MessageService
  ],
})
export class LogstreamComponent {
  title = 'socketrv';
  content = '';
  received:string[] = [];
  maxLogSize = 50;
  visible = false;

  constructor(private websocketService: WebsocketService, private messageService: MessageService) { 
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
              this.messageService.add({severity:'error', summary:'Error', detail:'Not able to receive message from logstream:'+ e});
            }
          });
      })

  }

  showDialog() {
    this.visible = true;
}

  receive(message: string) {
    console.log('Received message from WebSocket: ', message);
    message = this.parseMessage(message);
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
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

  clear() {
    this.messageService.clear();
  }
}
