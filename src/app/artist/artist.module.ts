import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './components/artist/artist.component';

import { ArtistRoutingModule } from './artist-routing.module';
import { ShareModule } from '../share/share.module';
import { MaterialModule } from '../material/material.module';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistDetailComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ShareModule,
    ArtistRoutingModule,
    CommonModule
  ]
})
export class ArtistModule { }
