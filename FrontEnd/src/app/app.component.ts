import { Router } from '@angular/router';
import { Component, EventEmitter } from '@angular/core';
import { LoginController } from './Components/Login/login.controller';
import {AutenticadorHttpService} from './Services/autenticador-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  usuarioAutenticado :boolean =false;
  mostrarMenu: boolean = false;

  constructor (private loginController: LoginController, private router: Router , private autenticadorHttp: AutenticadorHttpService )
  {

  }

  ngOnInit() {    

    console.log('LoginController.USuarioAutenticado: '+this.loginController.usuarioAutenticado); 
    

    this.loginController.mostrarMenuEmitter.subscribe(
      (mostrar) => {this.mostrarMenu = mostrar; }        
    );

    this.autenticadorHttp.usuarioAutenticadoMenuEmitter.subscribe(
      (mostrar) => {this.usuarioAutenticado= mostrar;}        
    );
   
    if (!this.usuarioAutenticado)
    {
      this.Logout();
    }
    
  }  

  mostrarMenuForce()
  {
    setTimeout(() => { this.mostrarMenu = true; }, 500);
  }

  Logout()
  {
    console.log('Logout');
    this.usuarioAutenticado = false;
    this.mostrarMenu = false;
    this.loginController.Logout();
  }

}
