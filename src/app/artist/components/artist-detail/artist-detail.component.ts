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
      twitter: new FormControl({value: this.validatorSocialNetworks(this.data, 'Twitter'), disabled: true}),
      instagram: new FormControl({value: this.validatorSocialNetworks(this.data, 'Instagram'), disabled: true}),
      facebook: new FormControl({value: this.validatorSocialNetworks(this.data, 'Facebook'), disabled: true})
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

}
