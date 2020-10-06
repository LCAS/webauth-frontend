import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from "./notifications.service";
import { NotificationRequest } from "../interface/notification";


@Injectable({
  providedIn: 'root'
})
export class WebNotificationsService {
  private isEnabled_: boolean = false;
  private request$: Subscription;
  private notification: Notification;

  constructor(private service: NotificationsService) { }

  public isEnabled(): boolean {
    return this.isEnabled_;
  }

  public enable(): void
  {
    this.isEnabled_ = true;
    this.trySubscribe();
  }

  public disable(): void
  {
    this.isEnabled_ = false;
    this.unsubscribe();
  }

  private trySubscribe(): void {
    Notification.requestPermission()
    .then((permission) => {if (permission == "granted") { this.subscribe() }});
  }

  private subscribe(): void {
    this.request$ = this.service.onNotification().subscribe(
      (req: NotificationRequest) => {this.notify(req)});
  }

  private unsubscribe(): void {
    this.request$.unsubscribe();
  }

  private notify(request: NotificationRequest): void {
    var bodyText: string = `${request.user_name}@${request.host_name} requests authorization for ${request.service_name}`
    this.notification = new Notification("Authorization request", {body: bodyText});
  }
}
