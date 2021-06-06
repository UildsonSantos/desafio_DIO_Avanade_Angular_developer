import { ValidateFieldsService } from './../validate-fields.service';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'uss-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent {

  @Input() label: string;
  @Input() tipo: string;
  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validation: ValidateFieldsService) { }


  get formControlNameInput(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
