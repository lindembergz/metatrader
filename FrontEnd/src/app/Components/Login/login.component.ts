import { Component, OnInit } from '@angular/core';
import { AuthService } from './AuthService';
import {Usuario} from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = {email: '', senha:''};

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.mostrarMenuEmitter.subscribe()
  }

  Login(){
    console.log('Login');
    this.authService.Login(this.usuario);
  }

}





