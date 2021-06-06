import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertModel } from '../../models/alert.model';

@Component({
  selector: 'uss-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  public alert = new AlertModel();

  constructor(public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertModel) { }

  ngOnInit(): void {
    if (this.data){
      this.alert.titulo = this.data.titulo || this.alert.titulo;
      this.alert.descricao = this.data.descricao || this.alert.descricao;
      this.alert.btnSucesso = this.data.btnSucesso || this.alert.btnSucesso;
      this.alert.btnCancelar = this.data.btnCancelar || this.alert.btnCancelar;
      this.alert.corBtnSucesso = this.data.corBtnSucesso || this.alert.corBtnSucesso;
      this.alert.corBtnCancelar = this.data.corBtnCancelar || this.alert.corBtnCancelar;
      this.alert.possuiBtnFechar = this.data.possuiBtnFechar || this.alert.possuiBtnFechar;
    }
  }

}
