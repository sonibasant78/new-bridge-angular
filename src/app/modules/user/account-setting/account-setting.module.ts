import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingRoutingModule } from './account-setting-routing.module';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignOutComponent } from './sign-out/sign-out.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    ChangeUsernameComponent,
    ChangePasswordComponent,
    SignOutComponent,
    DeleteAccountComponent
  ],
  imports: [
    CommonModule,
    AccountSettingRoutingModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class AccountSettingModule { }
