import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  

  constructor(private formBuilder: FormBuilder) {
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
      socialNetworks: ['']
    });
  }

  visibility(event: Event): void {
    event.preventDefault();
    this.validar = !this.validar;
  }

  register(): void {
    console.log(this.formUser.get('salsa').value);
    console.log(this.formUser.get('vallenato').value);
    console.log(this.formUser.get('bachata').value);
    console.log(this.formUser.get('clasica').value);
    console.log(this.formUser.get('regueton').value);
  }

}
