import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';
import { UserGuard } from '../guardians/user/user.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [UserGuard],
        component: RecomendacionesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecomendacionesRoutingModule{ }
