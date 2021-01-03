import { Component, destroyPlatform, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Produtos } from 'src/app/models/produtos';
import { ProdutosService } from 'src/app/servicos/produtos/produtos.service';

@Component({
  selector: 'app-produtos-cadastro',
  templateUrl: './produtos-cadastro.component.html',
  styleUrls: ['./produtos-cadastro.component.css']
})
export class ProdutosCadastroComponent implements OnInit {

  title = 'Cadastro de Produto';
  public produto: Produtos;
  public mensagem: string;
  public ativarSpinner: boolean;
  arquivoSelecionado: File;

  constructor(private produtosService: ProdutosService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    const produtoSession = sessionStorage.getItem('produtoSession');
    if (produtoSession) {
      this.produto = JSON.parse(produtoSession);
    } else {
      this.produto = new Produtos();
    }
  }

  // public inputChange(files: FileList) {
  //   this.arquivoSelecionado = files.item(0);
  //   this.ativarSpinner = true;
  //   this.produtosService.enviarArquivo(this.arquivoSelecionado)
  //   .subscribe (
  //     NOMEJSON => {
  //       this.produto.nomeImagem = JSON.parse(NOMEJSON);
  //       console.log(NOMEJSON);
  //       this.ativarSpinner = false;
  //     },
  //     eX => {
  //       console.log(eX.error);
  //       this.ativarSpinner = false;
  //     }
  //   );
  // }

  public cadastrar(){
    this.ativarEspera();
    this.produtosService.cadastrarProdutos(this.produto)
    .subscribe(
      PRODUTOJSON => {
        // console.log(PRODUTOJSON);
        this.desativarEspera();
        this.router.navigate(['/produtos']);
      },
      eX => {
        console.log(eX.error);
        this.mensagem = eX.error;
        this.desativarEspera();
      }
    );
  }
  
  public cancelar(){
    if(this.modalService.hasOpenModals())
      this.modalService.dismissAll();    
  }

  public ativarEspera() {
    this.ativarSpinner = true;
  }
  public desativarEspera() {
    this.ativarSpinner = false;
  }

}
