import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListComponent } from './Components/Cliente/cliente-list.component';
import { MetatraderListComponent } from './Components/Metatrader/metatrader-list.component';
import { ParticipacaoListComponent } from './Components/Participacao/participacao-list.component';
import { LoginComponent } from './Components/Login/login.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'app', component: AppComponent},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'clientes', component: ClienteListComponent},
  { path: 'metatraders', component: MetatraderListComponent},
   { path: 'participacoes', component: ParticipacaoListComponent}
  ];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})


export class AppRoutingModule { }
