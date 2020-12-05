import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagenotfoundComponent } from '../app/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(l => l.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(h => h.HomeModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(u => u.UserModule)
  },
  {
    path: 'song',
    loadChildren: () => import('./song/song.module').then(s => s.SongModule)
  },
  {
    path: 'artist',
    loadChildren: () => import('./artist/artist.module').then(a => a.ArtistModule)
  },
  {
    path: 'recomendaciones',
    loadChildren: () => import('./recomendaciones/recomendaciones.module').then(r => r.RecomendacionesModule)
  },
  {
    path: 'album',
    loadChildren: () => import('./album/album.module').then(a => a.AlbumModule)
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
