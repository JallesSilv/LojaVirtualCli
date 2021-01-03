
import { Component, destroyPlatform, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CategoriaProduto } from 'src/app/models/categoriaproduto';
import { Produtos } from 'src/app/models/produtos';
import { ProdutosService } from 'src/app/servicos/produtos/produtos.service';
import { Console } from 'console';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProdutosCadastroComponent } from './produtos-cadastro/produtos-cadastro.component';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  title = 'Cadastro de Produto';
  public modalRef: BsModalRef;
  public produto: Produtos;
  public mensagem: string;
  public ativarSpinner: boolean;
  public ativarCadastro:boolean;
  arquivoSelecionado: File;
  public _modalRef: any;
  constructor(private produtosService: ProdutosService,
              private router: Router,
              private modalService: NgbModal
              // private modalService: BsModalService,
              ) 
              {

               }

  ngOnInit(): void {
    const produtoSession = sessionStorage.getItem('produtoSession');
    if (produtoSession) {
      this.produto = JSON.parse(produtoSession);
    } else {
      this.produto = new Produtos();
    }
  }

  openModal(content)
  {
    this._modalRef =  this.modalService.open(content);
    
  }

  desativarModal()
  {
    
  }
  public ativarEspera() {
    this.ativarSpinner = true;
  }
  public DesativarEspera() {
    this.ativarSpinner = false;
  }
}
