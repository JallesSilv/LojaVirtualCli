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
  public produto: Produtos;
  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.produto = new Produtos();
  }

  public cadastrar(){
  this.produtosService.cadastrarProdutos(this.produto)
  .subscribe(
    produtoJson => {
      console.log(produtoJson);
    },
    eX => {
      console.log(eX.error);
    }
  );

  }

}
