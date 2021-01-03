import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'protractor';
import { PessoasService } from './../../../servicos/pessoas/pessoas.service';
import { Pessoas } from 'src/app/models/pessoas';
import { LoginService } from 'src/app/servicos/login/login.service';

@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.css']
})
export class NovoCadastroComponent implements OnInit {

  title = 'Cadastro de Usuários';

  public pessoas: Pessoas;
  public mensagem: string;
  public ativarSpinner: boolean;
  public pessoaCadastrado: boolean;

  constructor(
      private pessoasService: PessoasService,
      private loginService: LoginService,
      private router: Router,
    )
  {
  }

  ngOnInit(): void {
    var pessoaSession = sessionStorage.getItem('pessoaSession');
    if (pessoaSession) {
      this.pessoas = JSON.parse(pessoaSession);
    }else{
      this.pessoas = new Pessoas();
    }
    this.UsuarioSelecionado();
  }

  get usuario(){
    return this.loginService.usuario;
  }

  public UsuarioSelecionado() {
    this.pessoas = new Pessoas();
    // console.log(this.pessoas);
  }

  public Cadastrar(){
    this.pessoas = new Pessoas();    
  }

  public SalvaCadastro(){
    this.ativarSpinner = true;
    this.pessoasService.cadastrar(this.pessoas)
    .subscribe(
      READER_JSON => {
        this.pessoaCadastrado = true;
        this.mensagem = '';
        this.router.navigate['/pessoas-pesquisar'];
        // this.pessoasService.usuario = READER_JSON;
        // console.log(READER_JSON);
      },
      eX => {
        // console.log(eX.error);
        this.mensagem = eX.error;
        this.ativarSpinner = false;
      }
    );
  }

}
