import { IAlertModel } from './alert-model';

export class AlertModel implements IAlertModel {
  public titulo?: string;
  public descricao?: string;
  public btnSucesso?: string;
  public btnCancelar?: string;
  public corBtnSucesso?: string;
  public corBtnCancelar?: string;
  public possuiBtnFechar?: boolean;

  constructor() {
    this.titulo = 'Sucesso!';
    this.descricao = 'Usuario cadastrado com sucesso!';
    this.btnSucesso = 'OK';
    this.btnCancelar = 'Cancelar';
    this.corBtnSucesso = 'primary';
    this.corBtnCancelar = 'primary';
    this.possuiBtnFechar = false;
  }
}
