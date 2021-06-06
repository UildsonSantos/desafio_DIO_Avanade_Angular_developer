import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

import { AlertComponent } from './../../shared/components/alert/alert.component';
import { AlertModel } from './../../shared/models/alert.model';
import { UserService } from './../../core/user.service';
import { User } from './../../shared/models/user';

@Component({
  selector: 'uss-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {

  readonly userSemFoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv8NfrKHYJHjf3FxKhrD9OEO17wd6YXGzfs_j3lDUFz7JsGQZR09IyyD9EVo6Z3jxH3MQ&usqp=CAU'
  users: User[] = [];
  pagina = 0;
  readonly qtdPaginas = 4;

  constructor(public dialog: MatDialog,
              private userService: UserService) { }

  ngOnInit(): void {
    this.listarUsers();
  }

  onScroll(): void{
    this.listarUsers();

  }

  public listarUsers(): void {
    this.pagina++;
    this.userService.listar(this.pagina, this.qtdPaginas)
    .subscribe((users: User[]) => this.users.push(...users));
  }

  private resetarConsulta(): void {
    this.pagina = 0;
    this.users = [];
    this.listarUsers();
  }

  private deleteById(user: User): void{
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuiBtnFechar: true
      } as AlertModel
    };

    const dialogRef = this.dialog.open(AlertComponent, config);

    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        console.log('exclui');

        this.userService.excluir(user.id).subscribe(() => {
        this.listarUsers();
        this.users = this.users.filter(h => h !== user);
        },
        () => {
          const config = {
            data: {
              titulo: 'Erro ao excluir o registro!',
              descricao: 'Não conseguimos excluir seu registro, favor tentar novamente mais tarde',
              corBtnSucesso: 'warn',
              btnSucesso: 'Fechar'
            } as AlertModel
          };
          this.dialog.open(AlertComponent, config);
        });
      }
    });
  }
}
