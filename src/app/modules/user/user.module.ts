import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchedListComponent } from './searched-list/searched-list.component';
import { BridgeComponent } from './bridge/bridge.component';
import { UserRoutingModule } from './user-routing.module';
import { MessageComponent } from './message/message.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpComponent } from './help/help.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule,  MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WebsocketService } from 'src/app/services/websocket.service';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PickerModule } from '@ctrl/ngx-emoji-mart';



@NgModule({
    declarations: [
        DashboardComponent,
        SearchedListComponent,
        BridgeComponent,
        MessageComponent,
        ProfileComponent,
        HelpComponent,
        ChatListComponent,
        ChatDetailComponent,
        AccountSettingComponent,
        UserProfileComponent,
   
    ],
    imports: [
        PickerModule,
        CommonModule,
        UserRoutingModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatCardModule,
        MatDatepickerModule,
        MatDividerModule,
        ClipboardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatProgressSpinnerModule
        
    ],

    providers: [
        
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },WebsocketService,
      ],
     
})
export class UserModule { }
