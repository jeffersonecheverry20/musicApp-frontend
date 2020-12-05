import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistComponent } from './components/artist/artist.component';
import { UserGuard } from '../guardians/user/user.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [UserGuard],
        component: ArtistComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArtistRoutingModule{ }
