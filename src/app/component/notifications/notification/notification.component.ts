import { Component, Input, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/service/notifications.service';
import { NotificationRequest, NotificationReply } from '../../../interface/notification'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() request : NotificationRequest;

  constructor(private service : NotificationsService) { }

  ngOnInit(): void {
  }

  replyConfirm(): void {
    this.service.reply({id: this.request.id, authorize: true} as NotificationReply);
  }

  replyReject(): void {
    this.service.reply({id: this.request.id, authorize: false} as NotificationReply);
  }
}
