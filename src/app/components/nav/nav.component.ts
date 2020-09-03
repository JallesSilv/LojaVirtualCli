import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../../servicos/login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService) {
  }
  public isExpanded: boolean;

  collapse(){
    this.isExpanded = false;
  }

  toggle(){
    this.isExpanded = !this.isExpanded;
  }

 public usuarioLogado(): boolean {
   return this.loginService.usuario_autenticado();
 }

 sair(){
   this.loginService.limpar_sessao();
   this.router.navigate(['/']);
 }

 get usuario(){
   return this.loginService.usuario;
 }

  ngOnInit(): void {
  }

}
