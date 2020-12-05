import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdateArtistComponent } from './components/update-artist/update-artist.component';

const routes: Routes = [
    {
        path: 'updateUser',
        component: UpdateUserComponent
    },
    {
        path: 'updateArtist',
        component: UpdateArtistComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule{ }
