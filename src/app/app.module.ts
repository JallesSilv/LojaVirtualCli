import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPopper } from 'angular-popper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';

import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './servicos/login/login.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ArquivoBancoComponent } from './components/upload/arquivo-banco/arquivo-banco.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PedidosCadastroComponent } from './components/pedidos/pedidos-cadastro/pedidos-cadastro.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { ProdutosService } from './servicos/produtos/produtos.service';
import { ProdutosCadastroComponent } from './components/produtos/produtos-cadastro/produtos-cadastro.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { PessoasService } from './servicos/pessoas/pessoas.service';
import { PessoasPesquisarComponent } from './components/pessoas/pessoas-pesquisar/pessoas-pesquisar.component';
import { NovoCadastroComponent } from './components/pessoas/novo-cadastro/novo-cadastro.component';
import { FinanceiroComponent } from './components/financeiro/financeiro.component';
import { FinanceiroCadastroComponent } from './components/financeiro/financeiro-cadastro/financeiro-cadastro.component';
import { FinanceiroMovimentacaoComponent } from './components/financeiro/financeiro-movimentacao/financeiro-movimentacao.component';

import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,
    DashboardComponent,
    PerfilComponent,
    LoginComponent,
    PessoasComponent,
    NovoCadastroComponent,
    PessoasPesquisarComponent,
    ProdutosComponent,
    ProdutosCadastroComponent,
    PedidosComponent,
    PedidosCadastroComponent,
    ArquivoBancoComponent,
    FinanceiroComponent,
    FinanceiroCadastroComponent,
    FinanceiroMovimentacaoComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 3500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        progressBar: true,
        closeButton: true
      }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxPopper,
    NgbModule
  ],
  providers:
  [
    httpInterceptorProviders,
    LoginService,
    PessoasService,
    ProdutosService,
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
