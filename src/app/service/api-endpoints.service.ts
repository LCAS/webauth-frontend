import { Injectable } from '@angular/core';
import { IdentityProvider } from "../interface/identity-provider";
import { ApiEndpoints } from "../protocol/api-endpoints";
import { SETTINGS } from "../settings";
import { HttpCookie } from "./http-cookie";

const COOKIE_NAME = "api_endpoints";


@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {

  constructor() { }

  login(): IdentityProvider[] {
    let providers: IdentityProvider[] = [];
    const endpoints = this.getApiEndpoints();
    if (endpoints != null) {
      providers = endpoints.identity_provider.map(
        (idn) => {return {name: idn.name, path: idn.login} as IdentityProvider} );
    }
    return providers;
  }

  register(): IdentityProvider[] {
    let providers: IdentityProvider[] = [];
    const endpoints = this.getApiEndpoints();
    if (endpoints != null) {
      providers = endpoints.identity_provider.map(
        (idn) => {return {name: idn.name, path: idn.register} as IdentityProvider} );
    }
    return providers;
  }

  logout(): string {
    let endpoint = "";
    const endpoints = this.getApiEndpoints();
    if (endpoints != null) {
      endpoint = endpoints.logout;
    }
    return endpoint;
  }

  websocket(): string {
    let endpoint = "";
    const endpoints = this.getApiEndpoints();
    if (endpoints != null) {
      endpoint = endpoints.websocket;
    }
    return endpoint;
  }

  /**
   * Get endpoints from cookie if exists, else navigate to endpoint for set
   * the cookie.
   */
  private getApiEndpoints(): ApiEndpoints {
    let endpoints: ApiEndpoints;
    let value: string = HttpCookie.get(COOKIE_NAME);
    if (value.length) {
      endpoints = JSON.parse(value);
    } else {
      window.location.href = SETTINGS.endpoints.api.endpoints;
    }
    return endpoints;
  }
}
