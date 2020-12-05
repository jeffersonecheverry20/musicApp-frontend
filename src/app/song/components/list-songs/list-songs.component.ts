import { Component, OnInit } from '@angular/core';

import { Song } from '../../../modelos/song';
import { Album } from '../../../modelos/album';
import { Artist } from '../../../modelos/artists';
import { Response } from '../../../modelos/response';
import { SongService } from '../../../core/services/song/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-list-songs',
  templateUrl: './list-songs.component.html',
  styleUrls: ['./list-songs.component.scss']
})
export class ListSongsComponent implements OnInit {

  songs: Song[];
  album: Album;
  artist: Artist;
  url = environment.getImageAlbumLocal;
  song: Song;
  activar = false;

  constructor(private songService: SongService, private routeActive: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    console.log(this.routeActive.snapshot.params.album);
    const album = this.routeActive.snapshot.params.album;
    const token = sessionStorage.getItem('token');
    this.songService.getSongs(token, album).subscribe((response: Response) => {
      console.log(response);
      if (response.code === 0){
        this.songs = response.body.songs;
        console.log(response.body.songs[0].album);
        this.album = response.body.songs[0].album;
        console.log(response.body.songs[0].album.artist);
        this.artist = response.body.songs[0].album.artist;
      } else {
        console.log(response.code);
        console.log(response.body);
      }
    }, err => {
      console.log(err);
    });
  }

  // tslint:disable-next-line: variable-name
  reproducirSong(number: number): void{
    console.log(number);
    const songSelected = this.songs.filter(s => s.number === number);
    console.log(songSelected);
    this.song = songSelected[0];
    console.log(this.song.file);
    sessionStorage.setItem('activar', '1');
    sessionStorage.setItem('name-song', this.song.file);
    const player = new PlayerComponent();
    this.activar = true;
  }

}
