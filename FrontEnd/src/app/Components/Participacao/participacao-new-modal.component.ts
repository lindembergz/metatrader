
import {Component, ElementRef, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {ParticipacaoHttpService} from '../../Services/participacao-http.service';
import {Cliente, Metatrader, Participacao } from '../../models';
import { ClienteHttpService } from 'src/app/Services/cliente-http.service';
import { ClienteListComponent } from '../Cliente/cliente-list.component';



declare const $;

@Component({
    selector: 'participacao-new-modal',
    templateUrl: './participacao-new-modal.component.html',
    styleUrls: ['./participacao-modal.component.css']
})
export class ParticipacaoNewModalComponent implements OnInit {    
    //@Input()
    //metatrader: Metatrader;

      
   

    clientes: Cliente[] = [];
    clienteSelected : Cliente = { Id: 0,
                                  Nome: '',                                 
                                  Documento:{}, 
                                  Endereco: {},      
                                  Conjuge: {}, 
                                  Banco: {}
                                };

    metatraders: Metatrader[] = [];
    metatraderSelected : Metatrader ={ Id: 0,
                                       Servidor: '',    
                                       Login: '', 
                                      };


    participacao: Participacao = {
        Id: 0,
        Cliente : { Id: 0,
                    Nome: '', 
                /* Login: '', 
                    Senha: '', 
                    Celular: '', 
                    DataNascimento: '',
                    Profissao: '',
                    Nacionalidade: '', 
                    EstadoCivil: '', 
                    Responsavel: '', 
                    Status: '', */
                    Documento:{}, 
                    Endereco: {},      
                    Conjuge: {}, 
                    Banco: {}
                    }, 
  
        Metatrader : { Id: 0,
                       Servidor: '',    
                       Login: '',    
                     //Senha: '',     
                      },

    };

    

    @Output()
    onSubmit: EventEmitter<Participacao> = new EventEmitter<Participacao>();

    constructor(private element: ElementRef, 
        private participacaoHttp: ParticipacaoHttpService, 
        ) 
    {
        
    }

    ngOnInit() {
     
        
    }


    GetMetatraders()
    {

    }

    addParticipacao() {          
        
        this.participacao.Cliente= this.clienteSelected;
        this.participacao.Metatrader= this.metatraderSelected;

        this.participacaoHttp.create(this.participacao)
        .subscribe(
            data => {               
                //this.notifyMessage.success('Sucesso', `O cliente <strong>${this.cliente.nome}</strong> foi criado com sucesso`);
            }
        );
        
        this.onSubmit.emit(this.participacao);
        this.hide();
    }

    hide() {
        const divModal = this.getDivModal();
        $(divModal).modal('hide');
    }

    show() {           
        const divModal = this.getDivModal();
        $(divModal).modal('show');        
    }

    private getDivModal(): HTMLElement {
        const nativeElement: HTMLElement = this.element.nativeElement;
        return nativeElement.firstChild.firstChild as HTMLElement;
    }
}
