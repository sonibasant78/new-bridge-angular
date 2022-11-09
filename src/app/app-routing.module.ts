import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMessagesComponent } from './components/edit-messages/edit-messages.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password/forgot-password.component';
import { InterestsComponent } from './components/interests/interests/interests.component';
import { LoginComponent } from './components/login/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password/reset-password.component';
import { SchoolNameComponent } from './components/school-name/school-name/school-name.component';
import { SignUpPageComponent } from './components/sign-up-page//sign-up-page/sign-up-page.component';

import { AuthGuard } from './guards/auth.guard';
import { OuterAuthGuard } from './guards/outer-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/school-name', pathMatch: "full" },
  { path: 'login', canActivate: [OuterAuthGuard], component: LoginComponent },
  { path: 'school-name', component: SchoolNameComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:code', component: ResetPasswordComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'interests', component: InterestsComponent },
  { path: 'edit-messages', component: EditMessagesComponent },
  { path: 'user', canActivate: [AuthGuard], loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: '', redirectTo: '/school-name', pathMatch: "full" },

  // { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
