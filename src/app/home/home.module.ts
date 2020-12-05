import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';

import { ShareModule } from '../share/share.module';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    MaterialModule,
    HomeRoutingModule,
    ShareModule,
    CommonModule
  ]
})
export class HomeModule { }
