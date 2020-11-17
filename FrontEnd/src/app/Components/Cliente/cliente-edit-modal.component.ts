import {Component, ElementRef, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ClienteHttpService} from '../../Services/cliente-http.service';
import {Cliente} from '../../models';

declare const $;

@Component({
    selector: 'cliente-edit-modal',
    templateUrl: './cliente-edit-modal.component.html',
    styleUrls: ['./cliente-modal.component.css']
})
export class ClienteEditModalComponent implements OnInit {

    @Input()
    cliente: Cliente;

    @Output()
    onSubmit: EventEmitter<Cliente> = new EventEmitter<Cliente>();

    constructor(private element: ElementRef, private clienteHttp: ClienteHttpService) {
    }

    ngOnInit() {
    }

    EditCliente() {      
        this.clienteHttp.update(this.cliente)
        .subscribe(
            data => {               
                //this.notifyMessage.success('Sucesso', `O cliente <strong>${this.cliente.nome}</strong> foi criado com sucesso`);
            }
        );
        this.onSubmit.emit(this.cliente);
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
