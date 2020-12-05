import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSongsComponent } from './components/list-songs/list-songs.component';
import { PlayerComponent } from './components/player/player.component';

import { SongComponent } from './components/song/song.component';

const routes: Routes = [
    {
        path: 'create/:album',
        component: SongComponent
    },
    {
        path: 'list/:album',
        component: ListSongsComponent
    },
    {
        path: 'music',
        component: PlayerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SongRoutingModule{ }
