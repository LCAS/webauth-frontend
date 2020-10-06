import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { UserSession } from "./../interface/user-session";
import { SETTINGS } from "./../settings";
import { HttpCookie } from "./http-cookie";

const COOKIE_NAME = "user_session";

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor(private router: Router) { }

  /**
   * Try to get user session, if it exists.
   */
  get(): UserSession {
    return this.getUserSession();
  }

  /**
   * Make sure a valid user session exists, else route to login page.
   */
  assertExists(): void {
    let session = this.getUserSession();
    if (session == null) {
      this.router.navigate([SETTINGS.endpoints.app.login]);
    }
  }

  exists(): boolean {
    let session = this.getUserSession();
    return session != null;
  }

  private getUserSession(): UserSession {
    let userSession: UserSession;
    let value: string = HttpCookie.get(COOKIE_NAME);
    if (value.length) {
      let session = JSON.parse(value);
      userSession = {user_name: session.name};
    }
    return userSession;
  }
}
