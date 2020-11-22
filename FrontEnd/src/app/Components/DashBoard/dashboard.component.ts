import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models';
import { LoginComponent } from '../Login/login.component';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    mostrarLogin :boolean = true;
    NomeCliente: string = 'Lindemeberg';
    Id: number;
    cliente: Cliente;

    constructor( private router: ActivatedRoute , private loginComponent: LoginComponent )
    {
      this.router.params.subscribe(res => this.NomeCliente= res.Nome);
    }

    ngOnInit() {
      
    }

}