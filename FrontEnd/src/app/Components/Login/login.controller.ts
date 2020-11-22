import { Router } from '@angular/router';
import { Injectable, EventEmitter, Input } from '@angular/core';
import {Usuario, Cliente} from '../../models';
import {AutenticadorHttpService} from '../../Services/autenticador-http.service';
import {Observable, throwError} from 'rxjs';
import { stringify } from 'querystring';
import { ClienteHttpService } from 'src/app/Services/cliente-http.service';



@Injectable({ providedIn: 'root'})
export class LoginController {

  
  @Input()
  cliente: Cliente;

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router, private autenticadorHttp: AutenticadorHttpService) { }

  Login(usuario: Usuario)
  {
    if (usuario.Login === 'quant' && 
      usuario.Senha === 'capital!@#') {

      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);
      //Redireciona para a propria pagina para reavaliar a autenticacao para esconder o login
      this.router.navigate(['/login']);    
      
    }
  }

  LoginCliente(usuario: Usuario)
  {
    
    usuario.TipoUsuario = 'Cliente';

    console.log('Arroxa');
    this.autenticadorHttp.create(usuario).
    subscribe(
              response => { //{ data: [], pagination: {total: 9, current_page: 2} }                
                          //this.cliente.push(response[0])
                          this.cliente=response[0];
                          }
              ); 
   
     console.log(this.cliente);

    if ( this.cliente != undefined)
    {
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(false);
      //Redireciona para a propria pagina para reavaliar a autenticacao para esconder o login
      this.router.navigate(['/dashboard']);  
    }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

  render()
  {
    this.router.navigate(['/login']);
  }

}