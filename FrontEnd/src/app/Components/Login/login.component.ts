import { Component,EventEmitter, OnInit, Input } from '@angular/core';

import {Usuario, Cliente } from '../../models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import {AutenticadorHttpService} from '../../Services/autenticador-http.service';
import { LoginController } from './login.controller';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
})
export class LoginComponent implements OnInit {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  usuario: Usuario = {Login: '', Senha:'', Soucliente:'true',TipoUsuario:'Cliente'};
  @Input()
  cliente: Cliente;

  mostrarLogin :boolean = true;

  constructor(private router: Router, private loginController: LoginController , private autenticadorHttp: AutenticadorHttpService) { }

  ngOnInit() {
    
  }

  Login(){
    let ehCliente :boolean =this.usuario.Soucliente==='true';
    console.log(ehCliente);
    if (ehCliente)
    {
        let c : Observable<Cliente[]>;

        c = this.autenticadorHttp.create(this.usuario); 

        c.subscribe(response => { this.cliente=response[0]; })

        setTimeout(() => 
        {
            console.log(this.cliente);
            if ( this.cliente != undefined)
            {
                this.usuarioAutenticado = true;
                this.mostrarMenuEmitter.emit(false);
                this.router.navigate(['/dashboard/'+this.cliente.Nome]);  
                this.mostrarLogin = !this.loginController.usuarioEstaAutenticado();
            }
        },  500); 
        
    }
    else
    {
      this.loginController.Login(this.usuario);
      this.mostrarLogin = !this.loginController.usuarioEstaAutenticado(); 
    }
  }

}





