import {Component, OnInit, Input, ElementRef, EventEmitter, Output} from '@angular/core';
import {Participacao} from '../../models';
import {ParticipacaoHttpService} from '../../Services/participacao-http.service';

declare const $;

@Component({
    selector: 'participacao-delete-modal',
    templateUrl: './participacao-delete-modal.component.html',
    styleUrls: ['./participacao-modal.component.css']
})
export class ParticipacaoDeleteModalComponent implements OnInit {

    @Input()
    participacao: Participacao;

    @Output()
    onDestroy: EventEmitter<Participacao> = new EventEmitter<Participacao>();

    constructor(private element: ElementRef, private participacaoHttp: ParticipacaoHttpService) {
    }

    ngOnInit() {
    }

    destroy() {
        const copy = Object.assign({}, this.participacao);
        
        this.participacaoHttp.delete(this.participacao.Id)
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
