import { Component, OnInit } from '@angular/core';

import { Song } from '../../../modelos/song';
import { Album } from '../../../modelos/album';
import { Response } from '../../../modelos/response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SongService } from '../../../core/services/song/song.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  uri: string;
  song: Song;
  form: FormGroup;
  filesToUpload: Array<File>;

  constructor(private fomrBuilder: FormBuilder, private songService: SongService, private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fomrBuilder.group({
      number: ['', Validators.required],
      name: ['', Validators.required],
      duration: ['', Validators.required],
      genre: ['', Validators.required]
    });
  }

  saveSong(event: Event): void {
    console.log(this.routeActive.snapshot.params.album);
    event.preventDefault();
    event.stopPropagation();
    const token = sessionStorage.getItem('token');
    const idAlbum = this.routeActive.snapshot.params.album;

    const album = new Album();
    album._id = idAlbum;

    const song = new Song();
    song.number = this.form.get('number').value;
    song.name = this.form.get('name').value;
    song.duration = this.form.get('duration').value;
    song.genre = this.form.get('genre').value;
    song.album = album;
    song.file = '';
    song.numberTimeListened = 0;

    this.songService.saveSong(token, JSON.stringify(song)).subscribe((response: Response) => {
      console.log(response);
      if (response.code === 0) {
        console.log(environment.uploadAudioLocal + response.body.song._id);
        this.makeFileRequest(environment.uploadAudioLocal + response.body.song._id, [], this.filesToUpload)
          .then((result: any) => {
            console.log(result);
            this.buildForm();
          });
      } else {
        console.log(response.code);
        console.log(response.body);
      }
    }, err => {
      console.log(err);
    });
  }

  fileChaneEvent(fileInput: any): void {
    this.filesToUpload = (fileInput.target.files as Array<File>);
    console.log(this.filesToUpload);
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>): any {
    const token = sessionStorage.getItem('token');

    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }


}
