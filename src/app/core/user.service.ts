import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';

const url = 'http://localhost:3000/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  salvar(user:User): Observable<User> {
    if(user.id) {
      return this.http.put<User>(url + user.id, user);
    } else {
      return this.http.post<User>(url, user)
    }
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

  listar(pagina: number, qtdPaginas: number): Observable<User[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page', pagina.toString())
    httpParams = httpParams.set('_limit', qtdPaginas.toString())
    httpParams = httpParams.set('_sort', 'id')
    httpParams = httpParams.set('_order', 'desc')
    return this.http.get<User[]>(url, {params: httpParams});
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(url + id);
  }
}

