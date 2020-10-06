import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, Subscriber } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { retryWhen, take, delay } from 'rxjs/operators';
import { NotificationRequest, NotificationReply } from "../interface/notification";
import {
  Message,
  MessageError,
  MessageReply,
  MessageRequest,
  MessageState,
  MessageType,
  MessageUpdate
} from "../protocol/websocket";
import { ApiEndpointsService } from "./api-endpoints.service";
import { SETTINGS } from "../settings";
import { UserSessionService } from './user-session.service';


export enum ConnectionState {
  CONNECTED,
  DISCONNECTED,
  CONNECTING
};


class WebsocketConnectionState {

  constructor(initialState: ConnectionState = ConnectionState.CONNECTING) {
    this.state = initialState;
    this.state$ = new ReplaySubject<ConnectionState>(/*buffer=*/1);
    this.state$.next(initialState);
  }

  private state: ConnectionState;
  private state$: ReplaySubject<ConnectionState>

  public onState(): Observable<ConnectionState> {
    return this.state$;
  }

  public onConnect(): void {
    this.state = ConnectionState.CONNECTED;
    this.state$.next(this.state);
  }

  /**
   * After ws connection is closed, state DISCONNECTED is followed directly
   * by state CONNECTING. This check below prevents this unwanted ambiguous
   * state change.
   */
  public onDisconnect(event: any): void {
    console.log("Disconnected: ", event);
    if (this.state == ConnectionState.CONNECTED) {
      this.state = ConnectionState.CONNECTING;
      this.state$.next(this.state);
    }
  }

  public onClose(): void {
    this.state = ConnectionState.DISCONNECTED;
    this.state$.next(this.state);
  }

  public onError(err: any): void {
    console.log("Error in websocket:", err);
  }
}

class WebsocketSession {

  private connectionState: WebsocketConnectionState;
  private connection$: WebSocketSubject<Message>

  constructor(private protocol: WebsocketProtocol) {
    this.connectionState = new WebsocketConnectionState();
  }

  public isConnected(): boolean {
    return this.connection$ != null;
  }

  public connect(url: string): void {
    if (!this.connection$) {
      this.connection$ = webSocket({
        url: url,
        // TODO use observers instead?
        serializer: msg => this.protocol.encode(msg),
        openObserver: { next: () => this.connectionState.onConnect() },
        closeObserver: { next: (event) => this.connectionState.onDisconnect(event) },
      });
      // ref: https://stackoverflow.com/a/44979389
      this.connection$
        .pipe(
          retryWhen(errors => errors.pipe(delay(1000 * SETTINGS.websocket.reconnect_interval), take(SETTINGS.websocket.reconnect_attempts))))
        .subscribe(
          // TODO use observers instead?
          (msg) => this.protocol.decode(msg),
          (error) => this.connectionState.onError(error),
          () => this.connectionState.onClose());
    }
  }

  public onState(): Observable<ConnectionState> {
    return this.connectionState.onState();
  }

  public reply(msg: Message): void {
    this.connection$.next(msg);
  }
}

/**
 * Simple protocol to translate websocket messages into a list of notifications.
 */
class WebsocketProtocol {
  private notifications$: ReplaySubject<NotificationRequest[]>;
  private notifications: NotificationRequest[];
  // stores last received notification:
  private notification$: Subject<NotificationRequest>;

  constructor() {
    this.notification$ = new Subject<NotificationRequest>();
    this.notifications = [];
    this.notifications$ = new ReplaySubject<NotificationRequest[]>(/*buffer=*/1);
  }

  public onNotifications(): Observable<NotificationRequest[]> {
    return this.notifications$;
  }

  public onNotification(): Observable<NotificationRequest> {
    return this.notification$;
  }

  public decode(msg: Message): void {
    if (msg.type == MessageType.REQUEST) {
      this.receivedRequest(msg as MessageRequest);
    } else if (msg.type == MessageType.UPDATE) {
      this.receivedUpdate(msg as MessageUpdate);
    } else if (msg.type == MessageType.ERROR) {
      this.receivedError(msg as MessageError);
    } else {
      console.warn("Received unknown message type: ", msg);
    }
  }

  public encode(msg: Message): string {
    return JSON.stringify(msg)
  }

  private receivedRequest(msg: MessageRequest): void {
    let notification: NotificationRequest = {
      id: msg.id,
      host_name: msg.hostname,
      service_name: msg.service_name,
      user_name: msg.unix_account_name
    };
    this.notification$.next(notification);
    this.notifications.push(notification);
    this.notifications$.next(this.notifications);
  }

  /**
   * Remove message which is in state EXPIRED, AUTHORIZED, UNAUTHORIZED,
   * messages.
   */
  private receivedUpdate(msg: MessageUpdate): void {
    this.notifications = this.notifications.filter(
      (notification: NotificationRequest) => notification.id != msg.id);
    this.notifications$.next(this.notifications);
  }

  private receivedError(msg: MessageError) {
    console.warn("Received error: ", msg);
  }
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private session: WebsocketSession;
  private protocol: WebsocketProtocol;

  constructor(private apiEndpoints: ApiEndpointsService, private userSession: UserSessionService) {
    this.protocol = new WebsocketProtocol();
    this.session = new WebsocketSession(this.protocol)
  }

  public reply(reply: NotificationReply): void {
    let msg: MessageReply = {
      type: MessageType.RESPONSE,
      id: reply.id,
      state: (reply.authorize ? MessageState.AUTHORIZED : MessageState.UNAUTHORIZED)
    };
    this.session.reply(msg);
  }

  public onNotifications(): Observable<NotificationRequest[]> {
    this.tryConnect();
    return this.protocol.onNotifications();
  }

  public onNotification(): Observable<NotificationRequest> {
    this.tryConnect();
    return this.protocol.onNotification();
  }

  private tryConnect(): void {
    if (this.session.isConnected() == false && this.userSession.exists())
    {
      this.connect();
    }
  }

  public onConnectionState(): Observable<ConnectionState> {
    return this.session.onState();
  }

  private connect(): void
  {
    const url = this.apiEndpoints.websocket();
    this.session.connect(url);
  }
}
