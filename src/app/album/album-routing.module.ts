import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumArtistComponent } from './components/album-artist/album-artist.component';

import { AlbumComponent } from './components/album/album.component';
import { CreateAlbumComponent } from './components/create-album/create-album.component';

const routes: Routes = [
    {
        path: '',
        component: AlbumComponent
    },
    {
        path: 'artist/:id',
        component: AlbumArtistComponent
    },
    {
        path: 'createAlbum',
        component: CreateAlbumComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlbumRoutingModule{ }
