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

  public pessoa: Pessoas;
  public menssagem: string;
  public returnUrl: string;
  public usuarioSelecionado: Pessoas;
  public clienteForm: FormGroup;

  constructor(
      private pessoasService: PessoasService,
      private snackBar: MatSnackBar,
      private router: Router,
      private activatedRouter: ActivatedRoute
    )
    { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRouter.snapshot.queryParams[`returnUrl`];
    this.pessoa = new Pessoas();
  }

  public cadastrar(){
    this.pessoasService.cadastrar(this.pessoa)
    .subscribe(
      READER_JSON => {
      this.pessoasService.usuario = READER_JSON;
      },
      eX => {
        console.log(eX.error);
        this.menssagem = eX.error;
      }
    );
  }

}
