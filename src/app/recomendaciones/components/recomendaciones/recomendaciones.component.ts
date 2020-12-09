import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/user/user.service';
import { SongService } from '../../../core/services/song/song.service';
import { Response } from '../../../modelos/response';
import { Song } from '../../../modelos/song';
import { User } from '../../../modelos/user';
import { Album } from '../../../modelos/album';
import { Artist } from '../../../modelos/artists';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.scss']
})
export class RecomendacionesComponent implements OnInit {

  user: User;
  song: Song;
  songs: Song[] = [];
  activar = false;
  album: Album;
  artist: Artist;
  url = environment.getImageAlbumLocal;

  constructor(private userService: UserService, private songService: SongService) { }

  ngOnInit(): void {

    const idUsuario = sessionStorage.getItem('idUsuario');
    const token = sessionStorage.getItem('token');
    this.userService.getUser(idUsuario, token).subscribe((response: Response) => {
      console.log(response);
      if (response.code === 0) {
        this.user = response.body.user;
        console.log(this.user);
        this.songService.getSongs(token, '', 0).subscribe((resSong: Response) => {
          console.log(resSong);
          let contador = 0;

          // Opción 1
          this.user.genre.forEach(genre => {
            resSong.body.songs.filter((s: Song) => {
              if (s.album.genre === genre && s.numberTimeListened > 3) {
                console.log('Cumple las condiciones');
                this.songs[contador] = s;
                this.album = s.album;
                this.artist = this.album.artist;
                contador++;
                return s;
              }
            });
          });

          // Opción 2
          /*this.songs = resSong.body.songs.filter(s => {
            console.log(s.album);
            this.user.genre.forEach(genre => {
              console.log(genre);
              if (s.album.genre === genre && s.numberTimeListened > 3) {
                console.log('Cumple las condiciones');
                return s;
              }
            });
          });*/
          console.log(this.songs);
        }, err => {
          console.log(err);
        });
      } else {
        console.log(response.code);
        console.log(response.body);
      }
    }, err => {
      console.log(err);
    });

  }

  // tslint:disable-next-line: variable-name
  reproducirSong(number: number, id: string): void {
    console.log(number);
    const songSelected = this.songs.filter(s => s.number === number);
    console.log(songSelected);
    this.song = songSelected[0];
    console.log(this.song.file);
    sessionStorage.setItem('activar', '1');
    this.activar = true;

    // Update listened song
    if (sessionStorage.getItem('role') === 'ROLE_USER') {
      const token = sessionStorage.getItem('token');
      this.songService.updateListened(token, id).subscribe((response: Response) => {
        console.log(response);
        if (response.code === 0) {
          console.log(response.message);
        } else {
          console.log(response.code);
          console.log(response.body);
        }
      }, err => {
        console.log(err);
      });
    }

  }

}
