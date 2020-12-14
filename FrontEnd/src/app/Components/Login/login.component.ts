import { Component,EventEmitter, OnInit, Input,ViewChild } from '@angular/core';
import {Usuario, Cliente } from '../../models';
import { Router } from '@angular/router';


import {AutenticadorHttpService} from '../../Services/autenticador-http.service';
import { LoginController } from './login.controller';
import { ClienteNewModalComponent } from '../Cliente/cliente-new-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
})
export class LoginComponent implements OnInit {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  showMessageAlert = false;

  usuario: Usuario = {Login: '', Senha:'', Soucliente:'true',TipoUsuario:'Cliente'};
  @Input()
  cliente: Cliente;

  NewCliente : Cliente;

  mostrarLogin :boolean = true;

  @ViewChild(ClienteNewModalComponent) //pegar uma referencia de um elemento
  clienteNewModal: ClienteNewModalComponent;

  constructor(private router: Router,
              private loginController: LoginController ,
              private autenticadorHttp: AutenticadorHttpService
              ) 
  { }

  ngOnInit() { this.NewCliente =  
               {
                  Id: 0,
                  Nome: '',    
                  Login: '',    
                  Senha: '', 
                  Celular: '',  
                  DataNascimento: null, 
                  Profissao: '', 
                  Nacionalidade: 'BRASILEIRO', 
                  EstadoCivil: '', 
                  Responsavel: '',
                  Documento:{}, 
                  Endereco: {Pais:'BRASIL'},      
                  Conjuge: {}, 
                  Banco: {}
               }; 
               this.loginController.mostrarMenuEmitter.subscribe(
                mostrar => this.mostrarLogin = !mostrar
              );
              this.usuarioAutenticado = false;
             
             }

  Login()
  {
    let ehCliente :boolean =this.usuario.Soucliente==='true';
    console.log(ehCliente);
    if (ehCliente)
    {
      this.loginController.LoginCliente(this.usuario);  
      setTimeout(() => {
        this.showMessageAlert = !this.loginController.usuarioEstaAutenticado();
      }, 500); 
                   
    }
    else
    {      
      //this.usuarioAutenticado = true;
      this.loginController.Login(this.usuario); 
      setTimeout(() => {
        this.showMessageAlert = !this.loginController.usuarioEstaAutenticado();
      }, 500);            
      this.mostrarLogin = !this.loginController.usuarioEstaAutenticado(); 
    }
  }

  Cadastrese()
  {
    console.log('cadastrese');
    this.clienteNewModal.cliente = this.NewCliente; 
    this.clienteNewModal.show();   
  }
}





