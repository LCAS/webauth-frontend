import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { NotificationsComponent } from './component/notifications/notifications.component';
import { SETTINGS } from "./settings";


const routes: Routes = [
  {path: SETTINGS.endpoints.app.login, component: LoginComponent},
  {path: SETTINGS.endpoints.app.register, component: RegisterComponent},
  {path: '', component: NotificationsComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
