import {Component, ElementRef, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {MetatraderHttpService} from '../../Services/metatrader-http.service';
import {Metatrader} from '../../models';

declare const $;

@Component({
    selector: 'metatrader-edit-modal',
    templateUrl: './metatrader-edit-modal.component.html',
    styleUrls: ['./metatrader-modal.component.css']
})
export class MetatraderEditModalComponent implements OnInit {

    @Input()
    metatrader: Metatrader;

    @Output()
    onSubmit: EventEmitter<Metatrader> = new EventEmitter<Metatrader>();

    constructor(private element: ElementRef, private metatraderHttp: MetatraderHttpService) {
    }

    ngOnInit() {
    }

    EditMetatrader() {      
        this.metatraderHttp.update(this.metatrader)
        .subscribe(
            data => {               
                //this.notifyMessage.success('Sucesso', `O cliente <strong>${this.cliente.nome}</strong> foi criado com sucesso`);
            }
        );
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
