import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: string[], private dialogoRef: MatDialogRef<ArtistDetailComponent>,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form =  this.formBuilder.group({
      twitter: new FormControl({value: this.data[0], disabled: true}),
      instagram: new FormControl({value: this.data[1], disabled: true}),
      facebook: new FormControl({value: this.data[2], disabled: true})
    });
  }

}
