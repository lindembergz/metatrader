import {Component, OnInit, Input, ElementRef, EventEmitter, Output} from '@angular/core';
import {Cliente} from '../../models';
import {ClienteHttpService} from '../../Services/cliente-http.service';

declare const $;

@Component({
    selector: 'cliente-delete-modal',
    templateUrl: './cliente-delete-modal.component.html',
    styleUrls: ['./cliente-modal.component.css']
})
export class ClienteDeleteModalComponent implements OnInit {

    @Input()
    cliente: Cliente;

    @Output()
    onDestroy: EventEmitter<Cliente> = new EventEmitter<Cliente>();

    constructor(private element: ElementRef, private clienteHttp: ClienteHttpService) {
    }

    ngOnInit() {
    }

    destroy() {
        const copy = Object.assign({}, this.cliente);
        
        this.clienteHttp.delete(this.cliente.Id)
        .subscribe(
            data => {               
                //this.notifyMessage.success('Sucesso', `O cliente <strong>${this.cliente.nome}</strong> foi criado com sucesso`);
            }
        );
        this.onDestroy.emit(copy);
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
        return nativeElement.firstChild as HTMLElement;
    }
}
