import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';

import { RecomendacionesRoutingModule } from './recomendaciones-routing.module';
import { ShareModule } from '../share/share.module';
import { SongModule } from '../song/song.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    RecomendacionesComponent
  ],
  imports: [
    MaterialModule,
    SongModule,
    ShareModule,
    RecomendacionesRoutingModule,
    CommonModule
  ]
})
export class RecomendacionesModule { }
