import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdateArtistComponent } from './components/update-artist/update-artist.component';

import { UserRoutingModule } from './user-routing.module';
import { ShareModule } from '../share/share.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UpdateUserComponent,
    UpdateArtistComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ShareModule,
    UserRoutingModule,
    CommonModule
  ]
})
export class UserModule { }
