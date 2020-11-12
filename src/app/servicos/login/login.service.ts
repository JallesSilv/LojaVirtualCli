import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoas } from 'src/app/models/pessoas';
import { environment } from './../../../environments/environment.prod';
import { strict } from 'assert';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { NodeWithI18n } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Usuario: Pessoas;
  public baseUrl = `${environment.beseUrl}api/Pessoas`;

  constructor(private http: HttpClient) {
   }
   set usuario(usuario: Pessoas){
     sessionStorage.setItem('usuario-autenticado', JSON.stringify(usuario));
     this.Usuario = usuario;
   }

   get usuario(): Pessoas {
     const USUARIO_JSON = sessionStorage.getItem('usuario-autenticado');
     this.Usuario = JSON.parse(USUARIO_JSON);
     return this.Usuario;
   }

   get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }


   public usuario_autenticado(): boolean {
     return this.Usuario != null && this.Usuario.email !== '' && this.Usuario.senha !== '';
   }

   public limpar_sessao() {
     sessionStorage.setItem('usuario-autenticado', '');
     this.Usuario = null;
   }

  public verificarLogin(login: Pessoas): Observable<Pessoas> {

    const body = {
      email: login.email,
      senha: login.senha };

    return this.http.post<Pessoas>(`${this.baseUrl}/VerificarLogin`, body, {headers: this.headers});
  }

  public registrarLogin(login: Pessoas): Observable<Pessoas> {
    const body = {
      email: login.email,
      senha: login.senha,
      dataCadastro: new Date,
      Ativo: 1 };

    return this.http.post<Pessoas>(`${this.baseUrl}`, body, {headers: this.headers});
  }

  // public getAll(): Observable<Pessoas> {

  //   return this.http.get<Pessoas>(`${this.baseUrl}/VerificarLogin/` );
  // }
}
