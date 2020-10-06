import { Component, OnInit } from '@angular/core';
import { NotificationRequest } from "../../interface/notification";
import { Subscription } from "rxjs";
import { NotificationsService, ConnectionState } from "../../service/notifications.service";
import { WebNotificationsService } from "../../service/web-notifications.service";
import { UserSessionService } from 'src/app/service/user-session.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  private state$: Subscription;
  private notifications$: Subscription;
  private checkboxChecked: boolean;

  requests: NotificationRequest[];

  State = ConnectionState;
  state: ConnectionState;

  constructor(
    private notifications: NotificationsService,
    private webNotifications: WebNotificationsService,
    private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.userSession.assertExists();
    this.notifications$ = this.notifications.onNotifications().subscribe(
      (requests) => this.requests = requests);
    this.state$ = this.notifications.onConnectionState().subscribe(
      (state: ConnectionState) => this.state = state);
    this.checkboxChecked = this.webNotifications.isEnabled();
  }

  ngOnDestroy(): void {
    this.state$.unsubscribe();
    this.notifications$.unsubscribe();
  }

  onCheckboxChange(checked: boolean) {
    if (checked) {
      this.webNotifications.enable();
    } else {
      this.webNotifications.disable();
    }
  }
}
