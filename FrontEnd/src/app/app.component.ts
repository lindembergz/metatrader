import { Component } from '@angular/core';
import { LoginController } from './Components/Login/login.controller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  mostrarMenu: boolean = false;

  constructor (private loginController: LoginController  )
  {

  }

  ngOnInit() {    
    this.loginController.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }  

}
