import {Component, ElementRef, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ParticipacaoHttpService} from '../../Services/participacao-http.service';
import {Cliente,Metatrader, Participacao} from '../../models';

declare const $;

@Component({
    selector: 'participacao-edit-modal',
    templateUrl: './participacao-edit-modal.component.html',
    styleUrls: ['./participacao-modal.component.css']
})
export class ParticipacaoEditModalComponent implements OnInit {

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
                                      };                   

    @Input()
    participacao: Participacao;

    @Output()
    onSubmit: EventEmitter<Participacao> = new EventEmitter<Participacao>();

    constructor(private element: ElementRef, private participacaoHttp: ParticipacaoHttpService) {
    }

    ngOnInit() {
    }

    EditParticipacao(event) { 
        this.participacao.Cliente= this.clienteSelected;
        this.participacao.Metatrader= this.metatraderSelected;     
        this.participacaoHttp.update(this.participacao)
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
