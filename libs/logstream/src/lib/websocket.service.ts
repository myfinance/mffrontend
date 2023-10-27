import { Injectable } from "@angular/core";
import { AnonymousSubject } from "rxjs/internal/Subject";
import { Observable, Observer } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MfdataService } from '@mffrontend/shared/data-access-mfdata';
import { HttpClient } from "@angular/common/http";




@Injectable({
    providedIn: 'root'
  })
export class WebsocketService {
    private WS_URL = "ws://localhost:30036/ws/logs";
    private socket: WebSocket = new WebSocket(this.WS_URL);

    constructor(private http: HttpClient, private mfDataService: MfdataService) {
        
        this.mfDataService.configLoaded.subscribe(
          () => {
            this.WS_URL = this.mfDataService.getLogstreamUrl();
            this.socket = new WebSocket(this.WS_URL);
          }
        )

        this.mfDataService.getLoginSubject().subscribe(
          () => {
            this.sendMessage(this.mfDataService.getUserName())
          }
        )
    }

  // Connect to the WebSocket server
  connect(): Observable<any> {
    return new Observable(observer => {
      this.socket.onopen = (event) => {
        console.log('WebSocket Connection Established');
      };

      this.socket.onmessage = (event) => {
        observer.next(event.data);
      };

      this.socket.onerror = (event) => {
        observer.error(event);
      };

      this.socket.onclose = (event) => {
        observer.complete();
      };

      // Return cleanup function to unsubscribe and close the WebSocket connection
      return () => {
        this.socket.close();
      };
    });
  }

  // Send a message through the WebSocket connection
  sendMessage(message: string): void {
    this.socket.send(message);
  }
}