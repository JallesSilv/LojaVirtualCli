import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './components/login/auth.guard';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NovoCadastroComponent } from './components/pessoas/novo-cadastro/novo-cadastro.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'pessoas', component: PessoasComponent},
  {path: 'pedidos', component: PedidosComponent, canActivate: [AuthGuard] },
  {path: 'produtos', component: ProdutosComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'novo-cadastro', component: NovoCadastroComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
