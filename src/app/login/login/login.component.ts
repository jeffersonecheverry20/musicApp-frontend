import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login/login.service';
import { UserGeneric } from '../../modelos/userGeneric';
import { Response } from '../../modelos/response';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form: FormGroup;
  validar = true;
  errorHttp = false;
  mensajeErrorHttp = '';
  tiposUsuario = ['Usuario', 'Cantante'];

  constructor(private formBuilder: FormBuilder, private routing: Router, private loginService: LoginService,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  private buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      tipoUsuario: ['', [Validators.required]]
    }) ;
  }

  // tslint:disable-next-line: typedef
  visibility(event: Event){
    event.preventDefault();
    this.validar = !this.validar;
  }

  // tslint:disable-next-line: typedef
  login(event: Event): void{
    event.preventDefault();
    const user = this.buildObjectUserGeneric();
    if (this.form.get('tipoUsuario').value === 'Usuario'){
      this.loginService.login(JSON.stringify(user)).subscribe((response: Response) => {
        if (response.code === 0){
          console.log(response.body.token);
          console.log(response.body.user);
          console.log('El nombre de la imagen es ', response.body.user.image);
          sessionStorage.setItem('token', response.body.token);
          sessionStorage.setItem('idUsuario', response.body.user._id);
          sessionStorage.setItem('nameUser', response.body.user.name + ' ' + response.body.user.surname);
          sessionStorage.setItem('role', response.body.user.role);
          sessionStorage.setItem('image', response.body.user.image);
          this.router.navigate(['/artist']);
        } else {
          console.log(response.message);
          console.log(response.body);
        }
      }, err => {
        console.log(err);
      });
    } else {
      this.loginService.loginArtist(JSON.stringify(user)).subscribe((response: Response) => {
        if (response.code === 0){
          console.log(response);
          console.log(response.body.token);
          sessionStorage.setItem('token', response.body.token);
          sessionStorage.setItem('idUsuario', response.body.user._id);
          sessionStorage.setItem('nameUser', response.body.user.name + ' ' + response.body.user.surname);
          sessionStorage.setItem('role', response.body.user.role);
          sessionStorage.setItem('image', response.body.user.image);
          this.router.navigate(['/album']);
        } else {
          console.log(response.message);
          console.log(response.body);
        }
      }, err => {
        console.log(err);
      });
    }

  }

  buildObjectUserGeneric(): any{
    const user = new UserGeneric();
    user.email = this.form.get('email').value;
    user.password = this.form.get('password').value;

    return user;
  }

  register(event: Event): void {
    event.preventDefault();
    this.routing.navigate(['/login/register']);
  }

}
