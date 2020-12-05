import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Song } from 'src/app/modelos/song';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {

  @Input() song: Song;
  songCurrent: Song;
  url = environment.getAudiloLocal;
  music: string;

  constructor() {
    /*this.music = sessionStorage.getItem('name-song');
    console.log('The song name is', this.music);*/
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes){
      console.log(changes);
      this.songCurrent = changes.song.currentValue;
      this.music = this.songCurrent.file;
      // tslint:disable-next-line: variable-name
      const file_path = this.url + this.songCurrent.file;
      document.getElementById('mp3-source').setAttribute('src', file_path);
      (document.getElementById('player') as any).load();
      (document.getElementById('player') as any).play();
    }

  }

  ngOnInit(): void {
  }
}
