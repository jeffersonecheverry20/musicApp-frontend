import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register/register.service';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule
    ],
    providers: [
        LoginService,
        RegisterService
    ]
})
export class CoreModule{}
