import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './components/album/album.component';

import { AlbumRoutingModule } from './album-routing.module';
import { ShareModule } from '../share/share.module';
import { AlbumArtistComponent } from './components/album-artist/album-artist.component';
import { MaterialModule } from '../material/material.module';
import { CreateAlbumComponent } from './components/create-album/create-album.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AlbumComponent,
    AlbumArtistComponent,
    CreateAlbumComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ShareModule,
    AlbumRoutingModule,
    CommonModule
  ]
})
export class AlbumModule { }
