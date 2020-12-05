import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/user/user.service';
import { Response } from '../../../modelos/response';
import { User } from '../../../modelos/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {}

}
