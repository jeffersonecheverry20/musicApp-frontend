import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../../core/services/user/user.service';
import { Response } from '../../../modelos/response';
import { environment } from 'src/environments/environment';
import { Artist } from '../../../modelos/artists';

@Component({
  selector: 'app-update-artist',
  templateUrl: './update-artist.component.html',
  styleUrls: ['./update-artist.component.scss']
})
export class UpdateArtistComponent implements OnInit {

  formArtist: FormGroup;
  url = '';
  artist: Artist;
  filesToUpload: Array<File>;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.url = environment.getImageArtistLocal + sessionStorage.getItem('image');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {

    const token = sessionStorage.getItem('token');
    const idUsuario = sessionStorage.getItem('idUsuario');
    this.userService.getArtist(token, idUsuario).subscribe((response: Response) => {
      console.log(response);
      if (response.code === 0) {
        const socialNetworks = response.body.artist.socialNetworks;
        this.url = environment.getImageArtistLocal + response.body.artist.image;
        this.formArtist = this.formBuilder.group({
          email: [response.body.artist.email , [Validators.required, Validators.email]],
          password: [response.body.artist.password, [Validators.required]],
          name: [response.body.artist.name, [Validators.required]],
          surname: [response.body.artist.surname, [Validators.required]],
          cellphone: [response.body.artist.cellphone, [Validators.required]],
          description: [response.body.artist.description, [Validators.required]],
          instagram: [this.validatorSocialNetworks(socialNetworks, 'Instagram')],
          twitter: [this.validatorSocialNetworks(socialNetworks, 'Twitter')],
          facebook: [this.validatorSocialNetworks(socialNetworks, 'Facebook')]
        });
        this.artist = response.body.artist;
        this.url = environment.getImageArtistLocal + response.body.artist.image;
      } else {
        console.log(response.code);
        console.log(response.body);
      }
    });

    this.formArtist = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      description: ['', [Validators.required]],
      instagram: [''],
      twitter: [''],
      facebook: ['']
    });
  }

  validatorSocialNetworks(socialNetworks: string[], type: string): any {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < socialNetworks.length; i++) {
      const typeAccount: string[] = socialNetworks[i].split('_');
      if (typeAccount[1] === type) {
        return typeAccount[0];
      }
    }
    return '';
  }

  updateArtist(): void{
    const token = sessionStorage.getItem('token');
    const artist: Artist = this.buildObjectArtist();

    this.userService.updateArtist(token, sessionStorage.getItem('idUsuario'), JSON.stringify(artist)).subscribe((response: Response) => {
      console.log(response);
      if (response.code === 0){
        this.artist = response.body;
        if (!this.filesToUpload) {
          // Redireccionar
        } else {
          this.makeFileRequest(environment.uploadImageArtisLocal + sessionStorage.getItem('idUsuario'), [], this.filesToUpload)
            .then((result: any) => {
              console.log(result);
              this.artist.image = result.body.image;
              sessionStorage.setItem('image', result.body.user.image);
              this.buildForm();
            });
        }
      } else {
        console.log(response.code);
        console.log(response.body);
      }
    }, err => {
      console.log(err);
    });
  }

  buildObjectArtist(): any {
    const artist = new Artist();
    artist.name = this.formArtist.get('name').value;
    artist.surname = this.formArtist.get('surname').value;
    artist.email = this.formArtist.get('email').value;
    artist.password = this.formArtist.get('password').value;
    artist.role = this.artist.role;
    artist.image = this.artist.image;
    // tslint:disable-next-line: max-line-length
    const instragram = this.formArtist.get('instagram').value !== null && this.formArtist.get('instagram').value !== '' ?  this.formArtist.get('instagram').value + '_Instagram' : '';
    const twitter = this.formArtist.get('twitter').value !== null && this.formArtist.get('twitter').value !== '' ? this.formArtist.get('twitter').value + '_Twitter' : '';
    const facebook = this.formArtist.get('facebook').value !== null && this.formArtist.get('facebook').value !== '' ? this.formArtist.get('facebook').value + '_Facebook' : '';
    artist.socialNetworks = [];
    artist.socialNetworks[0] = instragram;
    artist.socialNetworks[1] = twitter;
    artist.socialNetworks[2] = facebook;

    return artist;
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
