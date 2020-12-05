import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player/player.component';
import { SongComponent } from './components/song/song.component';

import { SongRoutingModule } from './song-routing.module';
import { ShareModule } from '../share/share.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListSongsComponent } from './components/list-songs/list-songs.component';

@NgModule({
  declarations: [
    PlayerComponent,
    SongComponent,
    ListSongsComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ShareModule,
    SongRoutingModule,
    CommonModule
  ]
})
export class SongModule { }
