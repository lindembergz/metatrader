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

    Total1:number=0;
    Total2:number=0;
    Total3:number=0;
    Total4:number=0;
    Total5:number=0;

    clienteHistorico :ClientesHistorico[]=[];

    clienteHistorico1 :ClientesHistorico[]=[];
    clienteHistorico2 :ClientesHistorico[]=[];
    clienteHistorico3 :ClientesHistorico[]=[];
    clienteHistorico4 :ClientesHistorico[]=[];
    clienteHistorico5 :ClientesHistorico[]=[];

    LabelsclienteHistorico:string[]=[];
    Labelsdatasets1:string[]=[];
    Labelsdatasets2:string[]=[];
    Labelsdatasets3:string[]=[];
    Labelsdatasets4:string[]=[];
    Labelsdatasets5:string[]=[];
   
    IndexMetatrader:string[]=[];

    @ViewChild("meuCanvas") elemento: ElementRef;

    @ViewChild("meuCanvas1") elemento1: ElementRef;
    @ViewChild("meuCanvas2") elemento2: ElementRef;
    @ViewChild("meuCanvas3") elemento3: ElementRef;
    @ViewChild("meuCanvas4") elemento4: ElementRef;
    @ViewChild("meuCanvas5") elemento5: ElementRef;

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

          this.carregarGrafico("MesAtual");
          
        }
    }

     formatMoney(number, decPlaces, decSep, thouSep) 
     {
      decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
      decSep = typeof decSep === "undefined" ? "." : decSep;
      thouSep = typeof thouSep === "undefined" ? "," : thouSep;
      var sign = number < 0 ? "-" : "";
      var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
      var j = (j = i.length) > 3 ? j % 3 : 0;
      
      return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - parseInt(i)).toFixed(decPlaces).slice(2) : "");
      }

    inicializarVariaveis()
    {
      this.clienteHistorico1 =[];
      this.clienteHistorico2 =[];
      this.clienteHistorico3 =[];
      this.clienteHistorico4 =[];
      this.clienteHistorico5 =[];

      this.LabelsclienteHistorico=[];
      this.Labelsdatasets1=[];
      this.Labelsdatasets2=[];
      this.Labelsdatasets3=[];
      this.Labelsdatasets4=[];
      this.Labelsdatasets5=[];     
      this.IndexMetatrader=[];
      this.IndexMetatrader=[];

      this.Total1=0;
      this.Total2=0;
      this.Total3=0;
      this.Total4=0;
      this.Total5=0;

    }

    carregarGrafico(periodo: string )
    {
        this.inicializarVariaveis();  
   
        this.historicoHttp.get(this.ClienteId, periodo).
          subscribe(response => 
          { 
              this.clienteHistorico = response; 
              this.clienteHistorico.forEach
              ( value => {
                    let date: Date = value.DataHora; 
                    if (this.LabelsclienteHistorico.indexOf(date.toString().substr(8,2)+'/'+
                                                            date.toString().substr(5,2)// +'/'+                                                           
                                                            ) == -1)
                        this.LabelsclienteHistorico.push( date.toString().substr(8,2)+'/'+date.toString().substr(5,2) 
                    );
              });       
        
              this.MontarDados();                                   
              this.CreateCharts();
              this.CreateChartPrincipal();
                            
           });       
    }

    MontarDados()
    {
      this.clienteHistorico.forEach( value => {
              if (this.IndexMetatrader.indexOf(value.Login ) ==-1)
              {
                this.IndexMetatrader.push( value.Login );
              }
              
              switch (this.IndexMetatrader.indexOf(value.Login )) {
                case 0:
                  this.Labelsdatasets1.push( value.Valor.toFixed(2) );
                  this.Total1 = this.Total1 + value.Valor;
                  this.clienteHistorico1.push(value);
                  break;
                case 1:
                  this.Labelsdatasets2.push( value.Valor.toFixed(2) );
                  this.Total2 = this.Total2 + value.Valor;
                  this.clienteHistorico2.push(value);
                  break;
                case 2:
                  this.Labelsdatasets3.push( value.Valor.toFixed(2) );
                  this.Total3 = this.Total3 + value.Valor;
                  this.clienteHistorico3.push(value);
                  break;
                case 3:
                  this.Labelsdatasets4.push( value.Valor.toFixed(2) );
                  this.Total4 = this.Total4 + value.Valor;
                  this.clienteHistorico4.push(value);
                  break;
                case 4:
                  this.Labelsdatasets5.push( value.Valor.toFixed(2) );
                  this.Total5 = this.Total5 + value.Valor;
                  this.clienteHistorico5.push(value);
                  break;
                default:
                  break;
              }
          } 
      );
    }

    CreateChartPrincipal()
    {

      new Chart( this.elemento.nativeElement, 
        {
            type: 'line',
            data: { labels: this.LabelsclienteHistorico,                             
                    datasets:
                    [                                
                          {label: this.IndexMetatrader[0]?this.IndexMetatrader[0]:'', 
                          data: this.Labelsdatasets1, 
                          borderColor: '#00AEFF',fill: true },//00AEFF  Azul

                          {label: this.IndexMetatrader[1]?this.IndexMetatrader[1]:'', 
                          data: this.Labelsdatasets2, 
                          borderColor: '#FF8033',fill: true  },//FF8033  Laranja

                          {label: this.IndexMetatrader[2]?this.IndexMetatrader[2]:'', 
                          data: this.Labelsdatasets3, 
                          borderColor: '#FF3333',fill: true },//FF3333  VERMELHO

                          {label: this.IndexMetatrader[3]?this.IndexMetatrader[3]:'', 
                          data: this.Labelsdatasets4, 
                          borderColor: '#FCE905',fill: true },//FCE905  AMARELO

                          {label: this.IndexMetatrader[4]?this.IndexMetatrader[4]:'', 
                          data: this.Labelsdatasets5, 
                          borderColor: '#03FB21',fill: true },//03FB21  VERDE
                    ]
                  },                              
             options: { legend: { display: true },
                        elements: {line: {tension: 0.1}},
                        scales: { xAxes: [{display: true, gridLines: { display: true }, scaleLabel: { display: true,labelString: '' }}],
                                yAxes: [{display: true,gridLines: { display: true},scaleLabel: {display: true,labelString: ''}}]
                               } 
                       }  
        }
      );
    }

    CreateCharts()
    {
      if (this.clienteHistorico1.length > 0) 
      {
        this.CreateChart( this.elemento1, this.LabelsclienteHistorico,this.IndexMetatrader[0] ,this.Labelsdatasets1,'#00AEFF','#87CEFA',this.Total1);
      }else { new Chart( this.elemento1.nativeElement,{data:[]}); }

      if (this.clienteHistorico2.length > 0) 
      {      
        this.CreateChart( this.elemento2,this.LabelsclienteHistorico, this.IndexMetatrader[1] ,this.Labelsdatasets2,'#FF8033','#F4A460',this.Total2);
      } else { new Chart( this.elemento2.nativeElement,{data:[]}); }

      if (this.clienteHistorico3.length > 0) 
      {      
        this.CreateChart( this.elemento3, this.LabelsclienteHistorico,this.IndexMetatrader[2] , this.Labelsdatasets3, '#FF3333', '#FF6347',this.Total3);
      } else { new Chart( this.elemento3.nativeElement,{data:[]}); }

      if (this.clienteHistorico4.length > 0) 
      {      
        this.CreateChart( this.elemento4, this.LabelsclienteHistorico,this.IndexMetatrader[3] ,this.Labelsdatasets4, '#FCE905', '#F0E68C',this.Total4);
      } else { new Chart( this.elemento4.nativeElement,{data:[]}); }

      if (this.clienteHistorico5.length > 0) 
      {      
        this.CreateChart( this.elemento5,this.LabelsclienteHistorico,this.IndexMetatrader[4] ,this.Labelsdatasets5,'#03FB21','#32CD32', this.Total5);
      } else { new Chart( this.elemento5.nativeElement,{data:[]}); }
      
    }

    //myLineChart.destroy();
    CreateChart( element: ElementRef, 
                 labels :string[],
                 indexMetatrader:string ,
                 Labelsdatasets: string[], 
                 cor, backcor: string, 
                 total:number)
    {
      new Chart( element.nativeElement, 
        {
        type: 'line',
        data: { labels: labels,                             
                datasets:
                [                                
                      {label: indexMetatrader?indexMetatrader:'', 
                      data: Labelsdatasets, 
                      borderColor: cor,
                      backgroundColor: backcor,
                      fill: true }
                ]
              },                              
          options: { legend: { display: true },
                    elements: {line: {tension: 0.1}},
                    scales: { xAxes: [{display: false, gridLines: { display: false }, scaleLabel: { display: false,labelString: 'Dia' }}],
                              yAxes: [{display: false,gridLines: { display: false},scaleLabel: {display: false,labelString: 'Valor'}}]
                            } ,
                    title: {
                              display: true,
                              text: this.formatMoney(total,2,',','.'),
                              position: 'bottom',
                              fontSize: 20
                          }  
                    } 
          }                     
        );
    }

}

/*

var chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(231,233,237)'
};

var randomScalingFactor = function() {
  return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var config = {
  type: 'line',
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My First dataset",
      backgroundColor: chartColors.red,
      borderColor: chartColors.red,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ],
      fill: false,
    }, {
      label: "My Second dataset",
      fill: false,
      backgroundColor: chartColors.blue,
      borderColor: chartColors.blue,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ],
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    },
    tooltips: {
      mode: 'label',
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: true,
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  }
};


var ctx = document.getElementById("canvas").getContext("2d");
window.myLine = new Chart(ctx, config);

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.2.1/Chart.js"></script>
<div style="width:100%;">
  <canvas id="canvas"></canvas>
</div>

*/