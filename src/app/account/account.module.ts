import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountDetailsComponent } from './account.details/account.details.component';
import { SharedModule } from '../shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        SharedModule,
        NgbModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent,
        AccountDetailsComponent
    ]
})
export class AccountModule { }