import { AlertComponent } from './../../shared/components/alert/alert.component';
import { AlertModel } from './../../shared/models/alert.model';
import { User } from './../../shared/models/user';
import { UserService } from './../../core/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ValidateFieldsService } from './../../shared/components/fields/validate-fields.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'uss-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  registrationForm: FormGroup;


  constructor(public validation: ValidateFieldsService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  get inputDoForm(){
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      urlFoto: [''],
      emailSend: ['',[Validators.email]],
      addedOn: ['']
    });
  }

  submit(): void {

    const myDatenow = Date();

    this.registrationForm.patchValue({'addedOn': myDatenow })
    this.registrationForm.markAllAsTouched();
    if(this.registrationForm.invalid) {
      return;
    }

    const user = this.registrationForm.getRawValue() as User;

    this.salvar(user);
  }

  reiniciarForm(): void {
    this.registrationForm.reset();
  }


  private salvar(user: User): void {
    this.userService.salvar(user).subscribe(() => {

      const config = {
      data: {
        titulo: 'Usuario cadastrado',
        btnSucesso: 'Fechar'
      } as AlertModel
    };
    const dialogRef = this.dialog.open(AlertComponent, config);

    dialogRef.afterClosed().subscribe((opcao: boolean) => {

      if (opcao) {
          this.router.navigateByUrl('users');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Error ao cadastrar um novo Usuario',
          descricao: 'Tente novamente mais tarde.',
          btnSucesso: 'Fechar'
        } as AlertModel
      };
      this.dialog.open(AlertComponent, config);
    });
  }
}
