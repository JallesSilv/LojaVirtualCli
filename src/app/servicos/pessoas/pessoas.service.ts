import { Observable } from 'rxjs';
import { Pessoas } from './../../models/pessoas';
import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private Usuario: Pessoas;
  public baseUrl = `${environment.beseUrl}api/Pessoas`;

  constructor(private http: HttpClient) {
   }

   set usuario(usuario: Pessoas) {
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

  public limpar_sessao() {
    sessionStorage.setItem('usuario-autenticado', '');
    this.Usuario = null;
  }

  public CarregarUsuario(pChave: number): Observable<Pessoas>{
    return this.http.get<Pessoas>(`${this.baseUrl}/${pChave}`);
  }


  public cadastrar(usuario: Pessoas): Observable<Pessoas> {
    const body = {
      email: usuario.email,
      nome: usuario.nome,
      senha: usuario.senha,
      telefone: usuario.telefone,
      cpf: usuario.cnpjCpf,
      endereco: usuario.endereco,
      observacoes: usuario.observacoes,
      dataCadastro: Date.now,
      Ativo: 1 };

    return this.http.post<Pessoas>(`${this.baseUrl}`, body, {headers: this.headers});
  }


}
