
import {Component, ElementRef, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {MetatraderHttpService} from '../../Services/metatrader-http.service';
import {Metatrader} from '../../models';

declare const $;

@Component({
    selector: 'metatrader-new-modal',
    templateUrl: './metatrader-new-modal.component.html',
    styleUrls: ['./metatrader-modal.component.css']
})
export class MetatraderNewModalComponent implements OnInit {

    //@Input()
    //metatrader: Metatrader;
    metatrader: Metatrader = {
        Id: 0,
        Servidor: '',    
        Login: '',    
        Senha: '', 

    };

    @Output()
    onSubmit: EventEmitter<Metatrader> = new EventEmitter<Metatrader>();

    constructor(private element: ElementRef, private metatraderHttp: MetatraderHttpService) {
    }

    ngOnInit() {
    }

    addMetatrader() {           
        
        this.metatraderHttp.create(this.metatrader)
        .subscribe(
            data => {               
                //this.notifyMessage.success('Sucesso', `O cliente <strong>${this.cliente.nome}</strong> foi criado com sucesso`);
            }
        );
        console.log(this.metatrader);
        this.onSubmit.emit(this.metatrader);
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
