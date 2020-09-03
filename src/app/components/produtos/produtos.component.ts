import { ProdutosService } from './../../servicos/produtos/produtos.service';
import { Produtos } from './../../models/produtos';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  title = 'Cadastro de Produto';
  public produto: Produtos;
  public mensagem: string;
  public ativarSpinner: boolean;
  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.produto = new Produtos();
  }

  public cadastrar(){
  this.produtosService.cadastrarProdutos(this.produto)
  .subscribe(
    PRODUTOJSON => {
      console.log(PRODUTOJSON);
    },
    eX => {
      console.log(eX.error);
    }
  );

  }

}
