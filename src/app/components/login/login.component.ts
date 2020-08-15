import { LoginService } from './../../servicos/login/login.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pessoas } from 'src/app/models/pessoas';
import { Router, ActivatedRoute } from '@angular/router';

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
  remail: string;
  rpassword: string;
  rcpassword: string;

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

  register() {

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
          //console.log(data);
        },
        error => {
          console.log(error.error);
          this.menssagem = error.error;
        }
      );

  //   if (this.pessoa.email  === 'jalles@gmail.com' && this.pessoa.senha === '123456') {
  //       sessionStorage.setItem("usuario-autenticado", "1");
  //       //this.snackBar.open('Login Successful', '', {duration: 1000});
  //       this.router.navigate([this.returnUrl]);
  //   // }else{
  //   //   this.snackBar.open('Login error', '', {duration: 1000});
  //   }
  }
}
