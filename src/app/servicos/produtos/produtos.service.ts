import { environment } from './../../../environments/environment';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Produtos } from './../../models/produtos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  public Produto: Produtos[];

public baseUrl = `${environment.beseUrl}api/Produtos`;

constructor(private http: HttpClient) { }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  public cadastrarProdutos(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(`${this.baseUrl}/cadastrar`, JSON.stringify(produto), {headers: this.headers});
  }

  public salvarProdutos(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(`${this.baseUrl}/salvar`, JSON.stringify(produto), {headers: this.headers});
  }

  public deletarProdutos(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(`${this.baseUrl}/deletar`, JSON.stringify(produto), {headers: this.headers});
  }

  public ObterTodosProdutos(): Observable<Produtos[]>{
    return this.http.get<Produtos[]>(`${this.baseUrl}`);
  }

  public ObterProdutosId(pChave: number): Observable<Produtos[]>{
    return this.http.get<Produtos[]>(`${this.baseUrl}/${pChave}`);
  }

}
