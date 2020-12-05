import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from '../../../modelos/response';
import { Album } from '../../../modelos/album';
import { Artist } from '../../../modelos/artists';
import { AlbumService } from '../../../core/services/album/album.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent implements OnInit {

  form: FormGroup;
  filesToUpload: Array<File>;

  constructor(private formBuilder: FormBuilder, private route: Router, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required]
    });
  }

  createAlbum(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const album = new Album();
    album.title = this.form.get('title').value;
    album.year = this.form.get('year').value;
    album.description = this.form.get('description').value;
    album.genre = this.form.get('genre').value;

    const artis = new Artist();
    artis._id = sessionStorage.getItem('idUsuario');
    album.artist = artis;

    const token = sessionStorage.getItem('token');
    this.albumService.saveAlbum(token, JSON.stringify(album)).subscribe((response: Response) => {
      console.log(response);
      if (response.code === 0) {
        this.makeFileRequest(environment.uploadImageAlbumLocal + response.body.album._id, [], this.filesToUpload)
          .then((result: any) => {
            console.log(result);
            this.route.navigate(['/album']);
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
