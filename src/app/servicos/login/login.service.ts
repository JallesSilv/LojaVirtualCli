import { environment } from './../../../environments/environment.prod';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoas } from 'src/app/models/pessoas';
import { strict } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _usuario: Pessoas;
  public baseUrl = `${environment.beseUrl}api/Pessoas`;

  constructor(private http: HttpClient) {
   }
   set usuario(usuario: Pessoas){
     sessionStorage.setItem('usuario-autenticado', JSON.stringify(usuario));
     this._usuario = usuario;
   }

   get usuario(): Pessoas {
     let usuario_json = sessionStorage.getItem('usuario-autenticado');
     this._usuario = JSON.parse(usuario_json);
     return this._usuario;
   }

   public usuario_autenticado(): boolean {
     return this._usuario != null && this._usuario.email !== '' && this._usuario.senha !== '';
   }

   public limpar_sessao() {
     sessionStorage.setItem('usuario-autenticado', '');
     this._usuario = null;
   }

  public verificarLogin(login: Pessoas): Observable<Pessoas> {

    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = {
      email: login.email,
      senha: login.senha };

    return this.http.post<Pessoas>(`${this.baseUrl}/VerificarLogin`, body, {headers});
  }

  public getAll(): Observable<Pessoas> {

    return this.http.get<Pessoas>(`${this.baseUrl}/VerificarLogin/` );
  }
}
