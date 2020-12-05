import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../../core/services/album/album.service';
import { Response } from '../../../modelos/response';
import { Album } from '../../../modelos/album';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-album-artist',
  templateUrl: './album-artist.component.html',
  styleUrls: ['./album-artist.component.scss']
})
export class AlbumArtistComponent implements OnInit {

  albumes: Album[];
  url = environment.getImageAlbumLocal;

  constructor(private  routeActive: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    console.log(this.routeActive.snapshot.params.id);
    const token = sessionStorage.getItem('token');
    const idArtista = this.routeActive.snapshot.params.id;
    console.log(idArtista);
    this.albumService.getAlbums(idArtista, token, true).subscribe((response: Response) => {
      console.log(response);
      if (response.code === 0){
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
