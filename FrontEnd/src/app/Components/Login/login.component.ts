import { Component,EventEmitter, OnInit, Input,ViewChild } from '@angular/core';

import {Usuario, Cliente } from '../../models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


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
              ) { }

  ngOnInit() { this.NewCliente = {Id: 0,
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
             }

  Login(){
    let ehCliente :boolean =this.usuario.Soucliente==='true';
    console.log(ehCliente);
    if (ehCliente)
    {
        this.autenticadorHttp.create(this.usuario)
                                 .subscribe(response => { this.cliente=response[0]; 
                                                              console.log(this.cliente);
                                                              if ( this.cliente != undefined)
                                                              {
                                                                  this.usuarioAutenticado = true;
                                                                  this.mostrarMenuEmitter.emit(false);
                                                                  this.router.navigate(['/dashboard/'+this.cliente.Id]);  
                                                                  this.mostrarLogin = !this.loginController.usuarioEstaAutenticado();
                                                              }
                                                         }
                    );       
    }
    else
    {
      this.loginController.Login(this.usuario);
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





