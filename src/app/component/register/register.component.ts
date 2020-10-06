import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/service/user-session.service';
import { IdentityProvider } from '../../interface/identity-provider';
import { ApiEndpointsService } from "../../service/api-endpoints.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: IdentityProvider[];

  constructor(
    private apiEndpoints: ApiEndpointsService,
    private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.register = this.apiEndpoints.register();
    this.userSession.assertExists();
  }
}
