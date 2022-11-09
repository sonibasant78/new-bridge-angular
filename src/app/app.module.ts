import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatLabel, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SchoolNameComponent } from './components/school-name/school-name/school-name.component';
import { MatIconModule } from '@angular/material/icon';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password/reset-password.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page/sign-up-page.component';
import { InterestsComponent } from './components/interests/interests/interests.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { UserComponent } from './modules/user/user.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { OuterAuthGuard } from './guards/outer-auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from "@angular/router";
import { MatDialogModule } from '@angular/material/dialog';
import { EditMessagesComponent } from './components/edit-messages/edit-messages.component';
// import { PickerModule } from '@ctrl/ngx-emoji-mart';
// import { NgxShimmerLoadingModule } from  'ngx-shimmer-loading';


@NgModule({
  declarations: [
    // PickerModule,
    AppComponent,
    LoginComponent,
    SchoolNameComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignUpPageComponent,
    InterestsComponent,
    UserComponent,
    EditMessagesComponent,

  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTabsModule,
    NgbModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatChipsModule,
    BrowserAnimationsModule,
    // NgxShimmerLoadingModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    OuterAuthGuard,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }, }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
