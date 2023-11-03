import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { MfdataService } from '@mffrontend/shared/data-access-mfdata';
import { HttpClient } from "@angular/common/http";




@Injectable({
    providedIn: 'root'
  })
export class WebsocketService {
    private WS_URL = "ws://localhost:30036/ws/logs";
    private socket!: WebSocket;
    private isConnected = false;
    private topic = "";
    private webSocketObserver!:  Observable<any>;

    webSocketConnectedSubject: Subject<unknown> = new Subject<unknown>();

    constructor(private http: HttpClient, private mfDataService: MfdataService) {
        
        this.mfDataService.getConfigLoadedSubject().subscribe(
          () => {
            this.WS_URL = this.mfDataService.getLogstreamUrl();
            this.webSocketObserver=this.connect();
            this.isConnected = true;
            this.webSocketConnectedSubject.next(true);
            if(this.topic) {
              this.sendMessage(this.topic);
            }
          }
        )

        this.mfDataService.getLoginSubject().subscribe(
          () => {
            this.topic = this.mfDataService.getUserName();
            if(this.isConnected) {
              this.sendMessage(this.mfDataService.getUserName());
            }
          }
        )
    }

    public getWebSocketObservable(): Observable<any> {
      return this.webSocketObserver;
    }

  // Connect to the WebSocket server
  connect(): Observable<any> {
    this.socket = new WebSocket(this.WS_URL);
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
    if(this.socket) this.socket.send(message);
  }
}