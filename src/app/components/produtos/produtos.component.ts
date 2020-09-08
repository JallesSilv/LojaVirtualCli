import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produtos } from './../../models/produtos';
import { ProdutosService } from './../../servicos/produtos/produtos.service';

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
  arquivoSelecionado: File;

  constructor(private produtosService: ProdutosService,
              private router: Router) { }

  ngOnInit(): void {
    const produtoSession = sessionStorage.getItem('produtoSession');
    if (produtoSession) {
      this.produto = JSON.parse(produtoSession);
    } else {
      this.produto = new Produtos();
    }
  }

  public inputChange(files: FileList) {
    this.arquivoSelecionado = files.item(0);
    this.ativarSpinner = true;
    this.produtosService.enviarArquivo(this.arquivoSelecionado)
    .subscribe (
      nomeArquivo => {
        this.produto.nomeImagem = nomeArquivo;
        console.log(nomeArquivo);
        this.ativarSpinner = false;
      },
      eX => {
        console.log(eX.error);
        this.ativarSpinner = false;
      }
    );
  }

  public cadastrar(){
    this.ativarEspera();
    this.produtosService.cadastrarProdutos(this.produto)
    .subscribe(
      PRODUTOJSON => {
        console.log(PRODUTOJSON);
        this.DesativarEspera();
        this.router.navigate(['/produtos']);
      },
      eX => {
        console.log(eX.error);
        this.mensagem = eX.error;
        this.DesativarEspera();
      }
    );
  }

  public ativarEspera() {
    this.ativarSpinner = true;
  }
  public DesativarEspera() {
    this.ativarSpinner = false;
  }
}
