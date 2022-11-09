import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountSettingComponent } from "./account-setting.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ChangeUsernameComponent } from "./change-username/change-username.component";
import { DeleteAccountComponent } from "./delete-account/delete-account.component";
import { SignOutComponent } from "./sign-out/sign-out.component";


export const UserRoute: Routes = [
    {
        path: '',
        component: AccountSettingComponent,
        children: [
            { path: 'change-username', component: ChangeUsernameComponent },
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'sign-out', component: SignOutComponent },
            { path: 'delete-account', component: DeleteAccountComponent },
            { path: '', redirectTo: 'change-username', pathMatch: 'full' },

        ]
    },
    { path: '', redirectTo: 'change-username', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(UserRoute)],
    exports: [RouterModule]
})
export class AccountSettingRoutingModule { }