import { Component, OnInit } from '@angular/core';
import { IdentityProvider } from '../../interface/identity-provider';
import { ApiEndpointsService } from "../../service/api-endpoints.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logins: IdentityProvider[];

  constructor(private apiEndpoints: ApiEndpointsService) { }

  ngOnInit(): void {
    this.logins = this.apiEndpoints.login();
  }
}
