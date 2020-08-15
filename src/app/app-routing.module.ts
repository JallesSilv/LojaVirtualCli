import { AuthGuard } from './components/login/auth.guard';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { NgModule } from '@angular/core';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'pessoas', component: PessoasComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'produtos', component: ProdutosComponent, canActivate: [AuthGuard] },
  {path: 'perfil', component: PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
