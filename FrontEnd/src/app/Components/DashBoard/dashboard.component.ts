import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Cliente, ClientesHistorico } from 'src/app/models';
import { LoginComponent } from '../Login/login.component';
import { Router, ActivatedRoute  } from '@angular/router';
import { HistoricoHttpService } from 'src/app/Services/historico-http.service';
import { Observable } from 'rxjs';

import { Chart } from 'Chart.js';
import { isLineBreak } from 'typescript';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    mostrarLogin :boolean = true;
    NomeCliente: string = 'Lindemeberg';
    ClienteId: number;

    clienteHistorico :ClientesHistorico[]=[];

    LabelsclienteHistorico:string[]=[];
    Labelsdatasets1:string[]=[];
    Labelsdatasets2:string[]=[];
    Labelsdatasets3:string[]=[];
    Labelsdatasets4:string[]=[];
    Labelsdatasets5:string[]=[];
   
    IndexMetatrader:string[]=[];

    @ViewChild("meuCanvas") elemento: ElementRef;

    constructor( private router: ActivatedRoute , 
      private loginComponent: LoginComponent, 
      private historicoHttp: HistoricoHttpService,
      private appComponent: AppComponent
      )
    {
      //this.router.params.subscribe(res => this.NomeCliente= res.Nome);
      this.router.params.subscribe(res => this.ClienteId= res.ClienteId);
    }

    ngOnInit() {       

        if (!this.appComponent.usuarioAutenticado) 
        {
            this.appComponent.Logout();
        }
        else
        {  

          this.historicoHttp.get(this.ClienteId).
          subscribe(response => { 
            this.clienteHistorico=response; 

            this.clienteHistorico.forEach( value => {

              let date: Date = value.DataHora; 
              if (this.LabelsclienteHistorico.indexOf(date.toString().substr(8,2)+'/'+
                                                      date.toString().substr(5,2) +'/'+
                                                      date.toString().substr(0,4)) == -1)
                  this.LabelsclienteHistorico.push( date.toString().substr(8,2)+'/'+
                  date.toString().substr(5,2) +'/'+
                  date.toString().substr(0,4)
               );
            });            
            
            this.clienteHistorico.forEach( value => {
                                                        if (this.IndexMetatrader.indexOf(value.Login ) ==-1)
                                                        {
                                                          this.IndexMetatrader.push( value.Login );
                                                        }
                                                        console.log('Index: '+value.Login +'  '+ this.IndexMetatrader.indexOf(value.Login ));
                                                        switch (this.IndexMetatrader.indexOf(value.Login )) {
                                                          case 0:
                                                            this.Labelsdatasets1.push( value.Valor.toFixed(2) );
                                                            break;
                                                          case 1:
                                                            this.Labelsdatasets2.push( value.Valor.toFixed(2) );
                                                            break;
                                                          case 2:
                                                            this.Labelsdatasets3.push( value.Valor.toFixed(2) );
                                                            break;
                                                          case 3:
                                                            this.Labelsdatasets4.push( value.Valor.toFixed(2) );
                                                            break;
                                                          case 4:
                                                            this.Labelsdatasets5.push( value.Valor.toFixed(2) );
                                                            break;
                                                          default:
                                                            break;
                                                        }
                                                    } 
                                          );
      
             new Chart( this.elemento.nativeElement, {
                            type: 'line',
                            data: { labels: this.LabelsclienteHistorico,                               
                                    datasets:[
                                      {label: this.IndexMetatrader[0]?this.IndexMetatrader[0]:'', data: this.Labelsdatasets1, borderColor: '#00AEFF',fill: false },//00AEFF  Azul
                                      {label: this.IndexMetatrader[1]?this.IndexMetatrader[1]:'', data: this.Labelsdatasets2, borderColor: '#FF8033',fill: false },//FF8033  Laranja
                                      {label: this.IndexMetatrader[2]?this.IndexMetatrader[2]:'', data: this.Labelsdatasets3, borderColor: '#FF3333',fill: false },//FF3333  VERMELHO
                                      {label: this.IndexMetatrader[3]?this.IndexMetatrader[3]:'', data: this.Labelsdatasets4, borderColor: '#FCE905',fill: false },//FCE905  AMARELO
                                      {label: this.IndexMetatrader[4]?this.IndexMetatrader[4]:'', data: this.Labelsdatasets5, borderColor: '#03FB21',fill: false },//03FB21  VERDE
                                             ]
                               },
                            options: { legend: { display: true } },                           
                            lineTension: 100 }  );
                  
                    

          }) 
        }
    }

}