import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import {Usuario} from '../../models';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  Login(usuario: Usuario)
  {
    if (usuario.Login === 'quant' && 
      usuario.Senha === 'capital!@#') {

      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);
      //Redireciona para a propria pagina para reavaliar a autenticacao para esconder o login
      this.router.navigate(['/login']);
      

    } else {
      this.usuarioAutenticado = false;

      this.mostrarMenuEmitter.emit(false);
    }
  }

  LoginCliente(usuario: Usuario)
  {
    //if (usuario.email === 'quant' && 
     // usuario.senha === 'capital!@#') {

      this.usuarioAutenticado = true;

      this.mostrarMenuEmitter.emit(true);
      //Redireciona para a propria pagina para reavaliar a autenticacao para esconder o login
      this.router.navigate(['/dashboard']);
      

    //} else {
    //  this.usuarioAutenticado = false;

    //  this.mostrarMenuEmitter.emit(false);
    //}
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

  render()
  {
    this.router.navigate(['/login']);
  }

}