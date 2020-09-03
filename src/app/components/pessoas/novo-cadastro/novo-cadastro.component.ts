import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'protractor';
import { PessoasService } from './../../../servicos/pessoas/pessoas.service';
import { Pessoas } from 'src/app/models/pessoas';

@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.css']
})
export class NovoCadastroComponent implements OnInit {

  title = 'Cadastro de Usuários';

  public pessoa: Pessoas;
  public mensagem: string;
  public ativarSpinner: boolean;
  public pessoaCadastrado: boolean;

  constructor(
      private pessoasService: PessoasService
    ) { }

  ngOnInit(): void {
    this.pessoa = new Pessoas();
  }

  public carregarUsuario() {

  }

  public cadastrar(){
    // this.pessoasService.
    this.pessoasService.cadastrar(this.pessoa)
    .subscribe(
      READER_JSON => {
        this.pessoaCadastrado = true;
        this.mensagem = '';
        this.ativarSpinner = true;
        // this.pessoasService.usuario = READER_JSON;
        // console.log(READER_JSON);
      },
      eX => {
        // console.log(eX.error);
        this.mensagem = eX.error;
        // this.ativarSpinner = false;
      }
    );
  }

}
