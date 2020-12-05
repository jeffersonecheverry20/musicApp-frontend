import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../core/services/register/register.service';
import { User } from '../../modelos/user';
import { Artist } from '../../modelos/artists';
import { Response } from '../../modelos/response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  formUser: FormGroup;
  formArtist: FormGroup;
  formSelection: FormGroup;
  tiposUsuario = ['Usuario', 'Cantante'];
  controlOptions: FormControl;
  validar = true;


  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private routing: Router) {
    this.controlOptions = new FormControl('user');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {

    this.formSelection = this.formBuilder.group({
      option: this.controlOptions
    });

    this.formUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      salsa: [''],
      vallenato: [''],
      bachata: [''],
      clasica: [''],
      regueton: [''],
      pop: [''],
      balada: [''],
      rock: ['']
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

  visibility(event: Event): void {
    event.preventDefault();
    this.validar = !this.validar;
  }

  register(): void {

    if (this.controlOptions.value === 'user'){
      const user = this.buildObjectUser();
      console.log(user);
      this.registerService.registerUser(JSON.stringify(user)).subscribe((response: Response) => {
        if (response.code === 0){
          console.log(response.message);
          console.log(response.body);
          this.routing.navigate(['/login']);
        } else {
          console.log(response.message);
        }
      }, err => {
        console.log(err);
      });
    } else {
      const artist = this.buildObjectArtist();
      console.log(artist);
      this.registerService.registerArtist(JSON.stringify(artist)).subscribe((response: Response) => {
        if (response.code === 0){
          this.routing.navigate(['/login']);
        } else {
          console.log(response.message);
        }
      }, err => {
        console.log(err);
      });
    }
  }

  buildObjectUser(): any{
    let contador = 0;
    const user = new User();
    user.name = this.formUser.get('name').value;
    user.surname = this.formUser.get('surname').value;
    user.email = this.formUser.get('email').value;
    user.password = this.formUser.get('password').value;
    user.genre = [];

    if (this.formUser.get('salsa').value === true){
      user.genre[contador] = 'Salsa';
      contador++;
    }

    if (this.formUser.get('vallenato').value === true){
      user.genre[contador] = 'Vallenato';
      contador++;
    }

    if (this.formUser.get('bachata').value === true){
      user.genre[contador] = 'Bachata';
      contador++;
    }

    if (this.formUser.get('clasica').value === true){
      user.genre[contador] = 'Clasica';
      contador++;
    }

    if (this.formUser.get('regueton').value === true){
      user.genre[contador] = 'Regueton';
      contador++;
    }

    if (this.formUser.get('pop').value === true){
      user.genre[contador] = 'Pop';
      contador++;
    }

    if (this.formUser.get('balada').value === true){
      user.genre[contador] = 'Balada';
      contador++;
    }

    if (this.formUser.get('rock').value === true){
      user.genre[contador] = 'Rock';
      contador++;
    }

    return user;
  }

  buildObjectArtist(): any{

    let contador = 0;
    const artits = new Artist();
    artits.name = this.formArtist.get('name').value;
    artits.surname = this.formArtist.get('surname').value;
    artits.email = this.formArtist.get('email').value;
    artits.password = this.formArtist.get('password').value;
    artits.cellphone = this.formArtist.get('cellphone').value;
    artits.description = this.formArtist.get('description').value;
    artits.socialNetworks = [];
    console.log(this.formArtist.get('instagram').value);

    if (this.formArtist.get('instagram').value !== '' && this.formArtist.get('instagram').value !== null){
      artits.socialNetworks[contador] = this.formArtist.get('instagram').value;
      contador++;
    }

    if (this.formArtist.get('twitter').value !== '' && this.formArtist.get('twitter').value !== null){
      artits.socialNetworks[contador] = this.formArtist.get('twitter').value;
      contador++;
    }

    if (this.formArtist.get('facebook').value !== '' && this.formArtist.get('facebook').value !== null){
      artits.socialNetworks[contador] = this.formArtist.get('facebook').value;
      contador++;
    }

    return artits;
  }

}
