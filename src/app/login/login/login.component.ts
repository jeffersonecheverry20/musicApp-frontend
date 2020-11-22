import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login/login.service';

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

  constructor(private formBuilder: FormBuilder, private routing: Router, private loginService: LoginService) {
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
  }

  register(event: Event): void {
    event.preventDefault();
    this.routing.navigate(['/login/register']);
  }

}
