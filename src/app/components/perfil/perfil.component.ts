import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Pessoas } from 'src/app/models/pessoas';
import { LoginService } from 'src/app/servicos/login/login.service';
import { PessoasService } from 'src/app/servicos/pessoas/pessoas.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {

  public modalRef: BsModalRef;
  public pessoaForm: FormGroup;
  public titulo = 'Pesquisar';
  public pessoas = this.usuarioLogado;
  public pessoaSelecionado: Pessoas;
  public carregarLoginSelecionado: Pessoas;

  private unsubscriber = new Subject();
  public modeUpdate = '';

  public error: any;

  ngOnInit(): void {
    // this.carregarPessoas();
    this.pessoaSelect(this.pessoas);
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  openModal(template: TemplateRef<Pessoas>){
    this.modalRef = this.modalService.show(template);
  }

  get usuarioLogado(){
    return this.loginService.usuario;
  }

  constructor(
    private router: Router,
    private pessoasService : PessoasService,
    private fb: FormBuilder,
    private modalService: BsModalService, 
    private toastr: ToastrService,
    private loginService: LoginService,

  ) {
    this.criarForm();
  }

  criarForm(){
    this.pessoaForm = this.fb.group({
      ativo:['', Validators.required],
      chavePessoa:['', Validators.required],
      nome:['', Validators.required],
      email:['', Validators.required],
      senha:['', Validators.required],
      cnpjCpf:['', Validators.required],
      cep:['', Validators.required],
      telefone:['', Validators.required],
      dataCadastro:['', Validators.required],
      endereco:['', Validators.required],
      observacoes:['', Validators.required],
    });
  }

  carregarPessoas()  {
    this.pessoasService.getChave(this.pessoas.chavePessoa)
    .subscribe(
      (data: Pessoas) => {
        this.pessoas = data;
      },
      (error: any) => {
        this.error = error;
        console.error('ERROR:', error);
      }
    );
  }

  savePessoa(){
    // this.ativarSpinner = true;
    // this.pessoasService.atualizar(this.pessoaForm.value)
    // .subscribe(
    //   READER_JSON => {
        // this.pessoaCadastrado = true;
        // this.mensagem = '';
        // this.pessoasService.usuario = READER_JSON;
        // console.log(READER_JSON);
      // },
      // eX => {
        // console.log(eX.error);
        // this.mensagem = eX.error;
        // this.ativarSpinner = false;
    //   }
    // );
    if (this.pessoaForm.valid) {
      // this.spinner.show();

      if (this.modeUpdate === 'post') {
        this.pessoas = {...this.pessoaForm.value};
      }else {
        this.pessoas = {chavePessoa: this.pessoaSelecionado.chavePessoa, ...this.pessoaForm.value };
      }
      this.pessoasService[this.modeUpdate](this.pessoas.chavePessoa, this.pessoas)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(
        () => {
          this.carregarPessoas();
          this.toastr.success('Cleinte Salvo Com Sucesso!');
        },
        (error: any) => {
          this.error(`Erro: Cleinte não pode ser salvo!`);
          console.log(error);
        },
        //  () => this.spinner.hide()
      );
    }
  }

  MostrarMensagem(texto: string)
  {
    console.log(texto);
  }

  pessoaSubmit() {
    console.log(this.pessoaForm.value);
  }

  pessoaSelect(pessoas: Pessoas){
    this.modeUpdate = 'put';
    this.pessoaSelecionado = pessoas;
    this.pessoaSubmit();
    this.pessoaForm.patchValue(pessoas);
    console.log(this.pessoaForm);
  }
  
  voltar() {
    this.pessoaSelecionado = null;
  }

}
