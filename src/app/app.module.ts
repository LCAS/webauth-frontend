import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from "./material.module";
import { LoginComponent } from './component/login/login.component';
import { NotificationsComponent } from './component/notifications/notifications.component';
import { NotificationComponent } from './component/notifications/notification/notification.component';
import { UserSessionComponent } from './component/user-session/user-session.component';
import { HeaderComponent } from './component/header/header.component';
import { RegisterComponent } from './component/register/register.component';
import { IdentityProviderComponent } from './component/identity-provider/identity-provider.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotificationsComponent,
    NotificationComponent,
    UserSessionComponent,
    HeaderComponent,
    RegisterComponent,
    IdentityProviderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
