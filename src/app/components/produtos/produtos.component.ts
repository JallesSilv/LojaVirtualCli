
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { TipoCategoria } from 'src/app/models/tipocategoria';
import { Produtos } from 'src/app/models/produtos';
import { ProdutosService } from 'src/app/servicos/produtos/produtos.service';


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
  arquivoSelecionado: File;

  constructor(private produtosService: ProdutosService,
              private router: Router,
              // private modalService: BsModalService
              ) { }

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

  openModal(template: TemplateRef<TipoCategoria>) {
    // var test = new PedidosComponent(template.elementRef.nativeElement);
    // this.modalRef = this.modalService.show(template);
  }

  public ativarEspera() {
    this.ativarSpinner = true;
  }
  public DesativarEspera() {
    this.ativarSpinner = false;
  }
}
