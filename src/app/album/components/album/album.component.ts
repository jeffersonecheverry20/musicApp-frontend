import { Component, OnInit } from '@angular/core';

import { AlbumService } from '../../../core/services/album/album.service';
import { Album } from '../../../modelos/album';
import { Response } from '../../../modelos/response';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  role = sessionStorage.getItem('role');
  albumes: Album[];
  url = environment.getImageAlbumLocal;

  constructor(private albumService: AlbumService, private route: Router) {
    console.log(this.role);
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');

    if (sessionStorage.getItem('role') === 'ROLE_ARTIST') {
      const idArtist = sessionStorage.getItem('idUsuario');
      this.albumService.getAlbums(idArtist, token, true).subscribe((response: Response) => {
        console.log(response);
        if (response.code === 0) {
          this.albumes = response.body.albums;
        } else {
          console.log(response.code);
          console.log(response.body);
        }
      }, err => {
        console.log(err);
      });
    } else {
      this.albumService.getAlbums('', token, false).subscribe((response: Response) => {
        console.log(response);
        if (response.code === 0) {
          this.albumes = response.body.albums;
        } else {
          console.log(response.code);
          console.log(response.body);
        }
      }, err => {
        console.log(err);
      });
    }
  }

  createAlbum(event: Event): void{
    event.preventDefault();
    event.stopPropagation();
    this.route.navigate(['/album/createAlbum']);
  }

  createSong(event: Event, album: string): void{
    event.preventDefault();
    event.stopPropagation();
    this.route.navigate(['/song/create/' + album]);
  }

  listSongs(event: Event, album: string): void{
    event.preventDefault();
    event.stopPropagation();
    this.route.navigate(['/song/list/' + album]);
  }

}
