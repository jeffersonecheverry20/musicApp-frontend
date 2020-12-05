import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';

import { RecomendacionesRoutingModule } from './recomendaciones-routing.module';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    RecomendacionesComponent
  ],
  imports: [
    ShareModule,
    RecomendacionesRoutingModule,
    CommonModule
  ]
})
export class RecomendacionesModule { }
