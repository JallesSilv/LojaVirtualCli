import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pessoas } from 'src/app/models/pessoas';
import { LoginService } from './../../servicos/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';

  public pessoa;
  public returnUrl: string;
  public menssagem: string;
  public ativarSpinner: boolean;
  // email: string;
  // password: string;
  verificarSenha: string;

  constructor(
        private snackBar: MatSnackBar,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private loginSevice: LoginService
    ) {
   }

  ngOnInit(): void {
    this.returnUrl = this.activatedRouter.snapshot.queryParams[`returnUrl`];
    this.pessoa = new Pessoas();
  }

  login() {
    this.ativarSpinner = true;
    this.loginSevice.verificarLogin(this.pessoa)
      .subscribe(
        READER_JSON => {
          this.loginSevice.usuario = READER_JSON;
          if (this.returnUrl == null) {
            this.router.navigate(['/']);
            this.ativarSpinner = false;
          }else{
            this.router.navigate([this.returnUrl]);
            this.ativarSpinner = false;
          }
        },
        eX => {
          console.log(eX.error);
          this.menssagem = eX.error;
          this.ativarSpinner = false;
        }
      );
    }

  registrarLogin() {
    this.ativarSpinner = true;
    this.loginSevice.registrarLogin(this.pessoa)
    .subscribe(
      READER_JSON => {
          if (READER_JSON.senha === this.verificarSenha) {
            this.loginSevice.usuario = READER_JSON;
            this.ativarSpinner = false;
          }
          if (this.returnUrl == null) {
            this.router.navigate(['/perfil']);
            this.ativarSpinner = false;
          }else{
            this.router.navigate([this.returnUrl]);
            this.ativarSpinner = false;
          }
        },
        eX => {
          console.log(eX.error);
          this.menssagem = eX.error;
          this.ativarSpinner = false;
        }
      );
    }
}
