import { Component, OnInit, OnChanges } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/modelos/user';
import { environment } from 'src/environments/environment';
import { UserService } from '../../../core/services/user/user.service';
import { Response } from '../../../modelos/response';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  formUser: FormGroup;
  username: string;
  user: User;
  filesToUpload: Array<File>;
  url: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    console.log('Ejecuto el constructor');
    console.log(sessionStorage.getItem('image'));
    this.url = environment.getImageUserLocal + sessionStorage.getItem('image');
    console.log(this.url);
    // this.buildForm();
  }

  ngOnInit(): void {
    console.log('Ejecuto el ngOnInit');
    this.buildForm();
    this.username = sessionStorage.getItem('nameUser');
  }

  private buildForm(): void {

    this.userService.getUser(sessionStorage.getItem('idUsuario'), sessionStorage.getItem('token')).subscribe((response: Response) => {
      console.log(response);
      if (response.code === 0) {
        this.url = environment.getImageUserLocal + response.body.user.image;
        const genre = response.body.user.genre;
        // console.log(genre);
        this.formUser = this.formBuilder.group({
          name: [response.body.user.name, [Validators.required]],
          surname: [response.body.user.surname, [Validators.required]],
          email: [response.body.user.email, [Validators.required, Validators.email]],
          password: [response.body.user.password, [Validators.required]],
          latina: [this.validatorGenre(genre, 'Latina')],
          reggae: [this.validatorGenre(genre, 'Reggae')],
          clasica: [this.validatorGenre(genre, 'Clasica')],
          pop: [this.validatorGenre(genre, 'Pop')],
          rock: [this.validatorGenre(genre, 'Rock')]
        });
        this.url = environment.getImageUserLocal + response.body.user.image;
        this.user = response.body;
      }
    }, err => {
      console.log(err);
    });

    this.formUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      latina: [''],
      reggae: [''],
      clasica: [''],
      pop: [''],
      rock: ['']
    });
  }

  validatorGenre(genre: string[], type: string): any {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < genre.length; i++) {
      if (genre[i] === type) {
        return true;
      }
    }
    return false;
  }

  updateUser(event: Event): void {

    event.preventDefault();

    const userUpdate = this.buildObjectUser();
    const token = sessionStorage.getItem('token');

    this.userService.updateUser(sessionStorage.getItem('idUsuario'), JSON.stringify(userUpdate), token).subscribe((response: Response) => {
      if (response.code === 0) {
        console.log(response);
        this.user = response.body;
        console.log('El nombre de la imagen es ', response.body.user.image);
        if (!this.filesToUpload) {
          // Redireccionar
        } else {
          this.makeFileRequest(environment.uploadImageUserLocal + sessionStorage.getItem('idUsuario'), [], this.filesToUpload)
            .then((result: any) => {
              console.log(result);
              this.user.image = result.body.image;
              sessionStorage.setItem('image', result.body.user.image);
              this.buildForm();
            });
        }
      } else {
        console.log(response.message);
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

  buildObjectUser(): any {
    let contador = 0;
    const user = new User();
    user.name = this.formUser.get('name').value;
    user.surname = this.formUser.get('surname').value;
    user.email = this.formUser.get('email').value;
    user.password = this.formUser.get('password').value;
    user.role = this.user.role;
    user.image = this.user.image;
    user.genre = [];

    if (this.formUser.get('latina').value === true) {
      user.genre[contador] = 'Latina';
      contador++;
    }

    if (this.formUser.get('reggae').value === true) {
      user.genre[contador] = 'Reggae';
      contador++;
    }

    if (this.formUser.get('clasica').value === true) {
      user.genre[contador] = 'Clasica';
      contador++;
    }

    if (this.formUser.get('pop').value === true) {
      user.genre[contador] = 'Pop';
      contador++;
    }

    if (this.formUser.get('rock').value === true) {
      user.genre[contador] = 'Rock';
      contador++;
    }

    return user;
  }

}
