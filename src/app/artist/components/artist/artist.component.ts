import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/user/user.service';
import { Response } from '../../../modelos/response';
import { Artist } from '../../../modelos/artists';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ArtistDetailComponent } from '../artist-detail/artist-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  role = '';
  artists: Artist[];
  url  = environment.getImageUserLocal;

  constructor(private userService: UserService, private dialogo: MatDialog, private route: Router) {
    this.role = sessionStorage.getItem('role');
  }

  ngOnInit(): void {
    this.userService.getAllArtists().subscribe((response: Response) => {
      console.log(response);
      if (response.code === 0){
        this.artists = response.body.user;
      } else {
        console.log(response.code);
        console.log(response.body);
      }
    }, err => {
      console.log(err);
    });
  }

  detailArtist(event: Event, email: string): void{
    event.preventDefault();
    event.stopPropagation();
    const artist: Artist[] = this.artists.filter(a => a.email === email);
    console.log(artist[0]);
    const socialNetworks = artist[0].socialNetworks.map(a => {
      return a;
    });
    const dialogoRef = this.dialogo.open(ArtistDetailComponent, {
      width: '300px',
      data: socialNetworks
    });

    dialogoRef.afterClosed().subscribe(resp => {
      this.ngOnInit();
    });
  }

  albumArtist(event: Event, id: string): void {
    event.preventDefault();
    event.stopPropagation();
    console.log(id);
    this.route.navigate(['/album/artist/' + id]);
  }

}
