import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../../../modelos/user';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  name = '';
  url = '';
  @Input() image: string;
  role = '';

  constructor(private router: Router, private userService: UserService) {
    this.role = sessionStorage.getItem('role');
    console.log('El rol en header es ', this.role);
    console.log(sessionStorage.getItem('nameUser'));
    this.url = environment.getImageUserLocal + sessionStorage.getItem('image');
    console.log(this.url);
    this.name = sessionStorage.getItem('nameUser');
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: variable-name
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes){
      this.url = changes.image.currentValue;
    }
  }

  logout(): void{
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
