import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaixaMovimentacao } from 'src/app/models/caixamovimentacao';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  private CaixaMovimentacao: CaixaMovimentacao;
  public baseUrl = `${environment.beseUrl}api/Financeiro`;

  constructor(private http: HttpClient) {
   }

  get headers(): HttpHeaders {
  return new HttpHeaders().set('content-type', 'application/json');
  }
  
  public CarregarMovimentacao(pDataInicio: string, pDataFim: string): Observable<CaixaMovimentacao>{
    return this.http.get<CaixaMovimentacao>(`${this.baseUrl}/CaixaMovimentacao?pDataInicio=${pDataInicio}&pDataFim=${pDataFim}`);
  }

  // CaixaMovimentacao?pDataInicio=2020-01-01&pDataFim=2020-12-30
}
