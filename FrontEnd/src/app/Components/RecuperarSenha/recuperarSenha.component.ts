import { Component,EventEmitter, OnInit, Input,ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { AutenticadorHttpService } from 'src/app/Services/autenticador-http.service';
import { RecuperaSenhaHttpService } from 'src/app/Services/recuperaSenha-http.service';

@Component({
  selector: 'recuperar-senha',
  templateUrl: './recuperarSenha.component.html',
  styleUrls: ['./recuperarSenha.component.css'], 
})
export class RecuperadorSenhaComponent implements OnInit {

  mostrarMenuEmitter = new EventEmitter<boolean>();

  showMessageAlert = false;

  constructor(private router: Router , private recuperaSenhaHttp: RecuperaSenhaHttpService        ) 
  { }

  ngOnInit() 
  {  }

  recuperar(email: string)
  {
    console.log(email);
    console.log(this.recuperaSenhaHttp.recuperarSenha(email));
  }

  

}





