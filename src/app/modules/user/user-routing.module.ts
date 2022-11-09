import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { AccountSettingComponent } from "./account-setting/account-setting.component";
import { BridgeComponent } from "./bridge/bridge.component";
import { ChatDetailComponent } from "./chat-detail/chat-detail.component";
import { ChatListComponent } from "./chat-list/chat-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HelpComponent } from "./help/help.component";
import { MessageComponent } from "./message/message.component";
import { ProfileComponent } from "./profile/profile.component";
import { SearchedListComponent } from "./searched-list/searched-list.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserComponent } from "./user.component";

export const UserRoute: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, },
            { path: 'searched-list', component: SearchedListComponent },
            { path: 'bridge', component: BridgeComponent },
            { path: 'message', component: MessageComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'user-profile', component: UserProfileComponent },
            { path: 'help', component: HelpComponent },
            { path: 'chat-list', component: ChatListComponent },
            { path: 'chat-detail', component: ChatDetailComponent },
            { path: 'account-setting', loadChildren: () => import('./../../modules/user/account-setting/account-setting.module').then(m => m.AccountSettingModule) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(UserRoute)],
    exports: [RouterModule]
})
export class UserRoutingModule { }