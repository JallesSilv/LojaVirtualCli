import { Component, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { CaixaMovimentacao } from 'src/app/models/caixamovimentacao';
import { FinanceiroService } from 'src/app/servicos/financeiro/financeiro.service';

@Component({
  selector: 'app-financeiro-movimentacao',
  templateUrl: './financeiro-movimentacao.component.html',
  styleUrls: ['./financeiro-movimentacao.component.css']
})
export class FinanceiroMovimentacaoComponent implements OnInit, OnDestroy {

  public titulo =  '';
  public Data = new Date();
  public modalRef: BsModalRef;
  public caixaMovimentacao: CaixaMovimentacao;
  public DataInicial :Date;
  public DataFim :Date;
  public StDataInicial: string;
  public StDataFim: string; 
  public movimentacaoSelecionado: CaixaMovimentacao;
  public movimentacaoForm: FormGroup;
  public DataForm: FormGroup;
  public modeUpdate = 'Teste';



  private unsubscriber = new Subject();

  constructor(private spinner: NgxSpinnerService,
              private fb: FormBuilder,
              private financeiroService: FinanceiroService,
              private modalService: BsModalService)
  {
    this.criarForm();
    this.iniciarDataForm();
  }

  ngOnInit(): void {
    this.carregarMovimentacao();
    this.iniciarDataForm();
  }
  pesquisar(){
    this.carregarMovimentacao();
  }

  ngOnDestroy(): void{
  this.unsubscriber.next();
  this.unsubscriber.complete();
  }

  openModal(template: TemplateRef<CaixaMovimentacao>){
    this.modalRef = this.modalService.show(template);
  }

  iniciarDataForm(){
    this.DataForm = this.fb.group({
      DataInicial :[this.StDataInicial, Validators.required] ,
      DataFim: [this.StDataFim, Validators.required ]
    });
  }

  criarForm(){
    this.movimentacaoForm = this.fb.group({
      chaveCaixaMovimentacao: ['', Validators.required],
      chaveCaixa : ['', Validators.required],
      chavePessoa : ['', Validators.required],
      chavePedido : ['', Validators.required],
      chaveFile : ['', Validators.required],
      descricao : ['', Validators.required],
      dataCadastro : ['', Validators.required],
      dataPago : ['', Validators.required],
      dataEstorno : ['', Validators.required],
      tipoLancamento : ['', Validators.required],
      fecharCaixaAutomatico : ['', Validators.required],
      valor : ['', Validators.required],
      valorAntecipado : ['', Validators.required],
      ativo : ['', Validators.required]
    });
  }

  carregarMovimentacao(){
    // this.spinner.show();
    if (this.DataInicial != undefined) {
      this.StDataInicial = this.DataInicial.toString();
      this.StDataFim = this.DataFim.toString();  
    }  
    if (this.DataInicial === undefined) {
      this.DataInicial = new Date(Date.now());
      this.DataInicial = new Date(this.DataInicial.getFullYear(), this.DataInicial.getMonth(), 1);
      this.StDataInicial = this.DataInicial.toISOString().split('T')[0];
    }
    if (this.DataFim === undefined) {
      this.DataFim = new Date(Date.now());
      this.StDataFim = this.DataFim.toISOString().split('T')[0];
      // this.DataFim = new Date(this.DataFim.toISOString());
      // this.DataFim.getFullYear()+'-'+this.DataInicial.getMonth()+'-'+(this.DataInicial.getDay()+0);

      //   .parse((date.getMonth()+1)+'/01/' + date.getFullYear());
      // this.DataFim = new Date(date);
      // this.DataFim.toUTCString().split('T')[0];
      // console.log(this.DataFim.toISOString().split('T')[0]);
      //console.log('Data Inicio ' + this.DataInicial.toLocaleDateString());
      // console.log('Data Inicio ' + (new Date(dataHojeInicio).toISOString()));
    }
      console.log(this.StDataInicial);
    this.financeiroService.CarregarMovimentacao(this.StDataInicial, this.StDataFim)
    .subscribe(
      (reader : CaixaMovimentacao) => {
        this.caixaMovimentacao = reader;
        // console.log(this.caixaMovimentacao);
        // console.log(reader);
      },
      (error: any)=>{
        console.error('Error:', error);

      }
    );
  }

  movimentacaoSubmit(){
    console.log(this.movimentacaoForm.value);
  }

  saveMovimentacao(){

  }

  movimentacaoSelect(caixaMovimentacao:CaixaMovimentacao){
    this.modeUpdate = 'put';
    this.movimentacaoSelecionado = caixaMovimentacao;
    this.movimentacaoForm.patchValue(caixaMovimentacao);
  }

  voltar(){
    this.movimentacaoSelecionado = null;
  }

}
