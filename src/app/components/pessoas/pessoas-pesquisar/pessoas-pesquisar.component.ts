import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Pessoas } from 'src/app/models/pessoas';
import { LoginService } from 'src/app/servicos/login/login.service';
import { PessoasService } from 'src/app/servicos/pessoas/pessoas.service';

@Component({
  selector: 'app-pessoas-pesquisar',
  templateUrl: './pessoas-pesquisar.component.html',
  styleUrls: ['./pessoas-pesquisar.component.css']
})
export class PessoasPesquisarComponent implements OnInit, OnDestroy {

  public modalRef: BsModalRef;
  public pessoaForm: FormGroup;
  public titulo = 'Pesquisar';
  public pessoas: Pessoas;
  public pessoaSelecionado: Pessoas;
  // public carregarLoginSelecionado: Pessoas;

  private unsubscriber = new Subject();
  public modeUpdate = '';

  public error: any;

  ngOnInit(): void {
    this.carregarPessoas();
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
      ativo:['', Validators.required]
    });
  }

  carregarPessoas()  {
    // this.spinner.show();
    this.pessoasService.getAll()
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
    this.pessoaForm.patchValue(pessoas);
  }
  
  voltar() {
    this.pessoaSelecionado = null;
  }

}
