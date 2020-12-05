import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    RouterModule,
    MaterialModule,
    CommonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ShareModule { }
