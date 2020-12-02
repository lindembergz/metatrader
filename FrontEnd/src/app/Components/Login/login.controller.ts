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

  usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();
 

  constructor(private router: Router, private autenticadorHttp: AutenticadorHttpService) { }

  Logout()
  {    
        this.usuarioAutenticado = false;
        this.mostrarMenuEmitter.emit(false);
        //this.usuarioAutenticadoMenuEmitter.emit( false );
        //Redireciona para a propria pagina para reavaliar a autenticacao para esconder o login
        this.router.navigate(['/login']);     
  }

  Login(usuario: Usuario)
  {
    
    if (usuario.Login === 'quant' &&  usuario.Senha === 'capital!@#') 
    {
        
        this.usuarioAutenticado = true;
        this.mostrarMenuEmitter.emit(true);
        this.autenticadorHttp.usuarioAutenticadoMenuEmitter.emit( true );
        //Redireciona para a propria pagina para reavaliar a autenticacao para esconder o login
        this.router.navigate(['/login']);    
        
    }
  }

  LoginCliente(usuario: Usuario)
  {
      this.autenticadorHttp.create(usuario).
      subscribe(
                response => {
                            this.cliente=response[0];
                            if ( this.cliente != undefined)
                            {                               
                                this.usuarioAutenticado = true;
                                this.mostrarMenuEmitter.emit(false);
                                this.autenticadorHttp.usuarioAutenticadoMenuEmitter.emit( true );
                                //Redireciona para a propria pagina para reavaliar a autenticacao para esconder o login
                                this.router.navigate(['/dashboard/'+this.cliente.Id]); 
                            }
                            }
                );   
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

  render()
  {
    this.router.navigate(['/login']);
  }

}