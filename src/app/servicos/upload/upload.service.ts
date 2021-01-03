import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fileToUpload } from 'src/app/models/fileToUpload';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  // public baseUrl = `${environment.beseUrl}api/Upload`;
  public baseUrl = `${environment.beseUrl}api/FileToUpload`;

  constructor(private http: HttpClient) { }

  

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  public enviarArquivo(arquivoSelecionado: fileToUpload): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/EnviarArquivo/`, arquivoSelecionado.fileAsBase64);
  }

  uploadFile(theFile: fileToUpload) : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    };
    return this.http.post<fileToUpload>(`${this.baseUrl}/EnviarArquivo/`, theFile, httpOptions);
  }

}
