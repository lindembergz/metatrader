import {Component, OnInit, Input, ElementRef, EventEmitter, Output} from '@angular/core';
import {Metatrader} from '../../models';
import {MetatraderHttpService} from '../../Services/metatrader-http.service';

declare const $;

@Component({
    selector: 'metatrader-delete-modal',
    templateUrl: './metatrader-delete-modal.component.html',
    styleUrls: ['./metatrader-modal.component.css']
})
export class MetatraderDeleteModalComponent implements OnInit {

    @Input()
    metatrader: Metatrader;

    @Output()
    onDestroy: EventEmitter<Metatrader> = new EventEmitter<Metatrader>();

    constructor(private element: ElementRef, private metatraderHttp: MetatraderHttpService) {
    }

    ngOnInit() {
    }

    destroy() {
        const copy = Object.assign({}, this.metatrader);
        
        this.metatraderHttp.delete(this.metatrader.Id)
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
