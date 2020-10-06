import { Component, OnInit } from '@angular/core';
import { ApiEndpointsService } from '../../service/api-endpoints.service';
import { UserSessionService } from "../../service/user-session.service";
import { UserSession } from "../../interface/user-session";

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.css']
})
export class UserSessionComponent implements OnInit {

  constructor(
    private userSession: UserSessionService,
    private apiEndpoints: ApiEndpointsService) { }

  session: UserSession;
  logout: string;

  ngOnInit(): void {
    let session = this.userSession.get();
    if (session) {
      this.session = session;
    }
    this.logout = this.apiEndpoints.logout();
  }
}
