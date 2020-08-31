import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    this.loginSevice.verificarLogin(this.pessoa)
      .subscribe(
        READER_JSON => {
          this.loginSevice.usuario = READER_JSON;
          if (this.returnUrl == null) {
            this.router.navigate(['/']);
          }else{
            this.router.navigate([this.returnUrl]);
          }
        },
        eX => {
          console.log(eX.error);
          this.menssagem = eX.error;
        }
      );
    }

    registrarLogin() {
      // const pEmail = this.loginSevice.
        // verificarLogin(this.pessoa).subscribe(
        // dados => {
        //   this.loginSevice.usuario.email = dados.email;
          // if (!pEmail) {
            this.loginSevice.registrarLogin(this.pessoa)
            .subscribe(
              READER_JSON => {
                this.loginSevice.usuario = READER_JSON;
                if (this.returnUrl == null) {
                  this.router.navigate(['/perfil']);
                }else{
                  // this.router.navigate([this.returnUrl]);
                  this.router.navigate(['/perfil']);
                }
              },
              eX => {
                console.log(eX.error);
                this.menssagem = eX.error;
              }
            );
          // }
        // },
        // eX => {
        //   console.log('Usuário já Existe');
        //   this.menssagem = eX.error;
        // });
      }


  //   if (this.pessoa.email  === 'jalles@gmail.com' && this.pessoa.senha === '123456') {
  //       sessionStorage.setItem("usuario-autenticado", "1");
  //       //this.snackBar.open('Login Successful', '', {duration: 1000});
  //       this.router.navigate([this.returnUrl]);
  //   // }else{
  //   //   this.snackBar.open('Login error', '', {duration: 1000});
  //   }
}
