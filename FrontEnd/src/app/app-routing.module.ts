import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListComponent } from './Components/Cliente/cliente-list.component';
import { MetatraderListComponent } from './Components/Metatrader/metatrader-list.component';
import { ParticipacaoListComponent } from './Components/Participacao/participacao-list.component';


const routes: Routes = [
  { path: 'api/clientes', component: ClienteListComponent},
  { path: 'api/metatraders', component: MetatraderListComponent},
   { path: 'api/participacoes', component: ParticipacaoListComponent}
  ];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})


export class AppRoutingModule { }
