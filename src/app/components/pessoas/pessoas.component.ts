import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public Cadastrar() {
    this.router.navigate(['/novo-cadastro']);
  }

  public VisualizarCadastrar() {
    this.router.navigate(['/pessoas-pesquisar']);
  }

  arvore(){
    [10,2].forEach(row => {
      new Array(row).fill('').forEach((v, i) => {
        console.log([
          new Array(9-i).fill('.'),
          new Array(1+i*2).fill('*'),
          new Array(9-i).fill('.'),
        ].join('-'));
      });  
    });
  }


}
