import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core'; 

import {AppComponent} from './app.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { SalaryColorDirective } from './Directives/salary-color.directive';

import { ClienteListComponent} from './Components/Cliente/cliente-list.component';
import { ClienteNewModalComponent } from './Components/Cliente/cliente-new-modal.component';
import { ClienteEditModalComponent } from './Components/Cliente/cliente-edit-modal.component';
import { ClienteDeleteModalComponent } from './Components/Cliente/cliente-delete-modal.component';

import { MetatraderListComponent} from './Components/Metatrader/metatrader-list.component';
import { MetatraderNewModalComponent } from './Components/Metatrader/metatrader-new-modal.component';
import { MetatraderEditModalComponent } from './Components/Metatrader/metatrader-edit-modal.component';
import { MetatraderDeleteModalComponent } from './Components/Metatrader/metatrader-delete-modal.component';

import { ParticipacaoListComponent} from './Components/Participacao/participacao-list.component';
import { ParticipacaoNewModalComponent } from './Components/Participacao/participacao-new-modal.component';
import { ParticipacaoEditModalComponent } from './Components/Participacao/participacao-edit-modal.component';
import { ParticipacaoDeleteModalComponent } from './Components/Participacao/participacao-delete-modal.component';

import { LoginComponent } from './Components/Login/login.component';


import { AlertSuccessComponent } from './Components/alert-success/alert-success.component';
        
import {HttpClientModule} from '@angular/common/http';

import { MyCurrencyPipe } from './Pipes/my-currency.pipe';

import { AppRoutingModule } from './app-routing.module';
import { ClienteHttpService } from './Services/cliente-http.service';
import { ParticipacaoHttpService } from './Services/participacao-http.service';
import { MetatraderHttpService } from './Services/metatrader-http.service';

import { DashboardComponent } from './Components/DashBoard/dashboard.component';
import {AutenticadorHttpService} from './Services/autenticador-http.service';
import {HistoricoHttpService} from './Services/historico-http.service';

import { LoginController } from './Components/Login/login.controller';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
    declarations: [
        AppComponent,       
        SalaryColorDirective,
      
        ClienteListComponent,
        ClienteNewModalComponent,
        ClienteEditModalComponent,
        ClienteDeleteModalComponent,

        MetatraderListComponent,
        MetatraderNewModalComponent,
        MetatraderEditModalComponent,
        MetatraderDeleteModalComponent,

        ParticipacaoListComponent,
        ParticipacaoNewModalComponent,
        ParticipacaoEditModalComponent,
        ParticipacaoDeleteModalComponent,

        AlertSuccessComponent,      
        MyCurrencyPipe, 

        LoginComponent,
        
        DashboardComponent,

    ],
    imports: [
         FormsModule, 
         ReactiveFormsModule,
         BrowserModule,
         FormsModule,
         HttpClientModule,
         AppRoutingModule,

    ],
    providers: [
                LoginController, 
                HistoricoHttpService,
                AutenticadorHttpService,                
                ClienteHttpService,
                MetatraderHttpService, 
                ParticipacaoHttpService,
                LoginComponent,
                [{provide: LocationStrategy, useClass: HashLocationStrategy}]
                ],


    bootstrap: [AppComponent]
})
export class AppModule {
}
