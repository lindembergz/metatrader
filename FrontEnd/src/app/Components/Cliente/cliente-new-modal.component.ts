import {Component, ElementRef, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {ClienteHttpService} from '../../Services/cliente-http.service';
import {Cliente} from '../../models';

declare const $;

@Component({
    selector: 'cliente-new-modal',
    templateUrl: './cliente-new-modal.component.html',
    styleUrls: ['./cliente-modal.component.css']
})
export class ClienteNewModalComponent implements OnInit {

    
    @Input()
    //cliente: Cliente;
    cliente: Cliente= {
        Id: 0,
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

    @Output()
    onSubmit: EventEmitter<Cliente> = new EventEmitter<Cliente>();

    constructor(private element: ElementRef, private clienteHttp: ClienteHttpService) {
    }

    ngOnInit() {
      
    }

    addCliente() {     
       this.clienteHttp.create(this.cliente)
        .subscribe(
            data => {               
                //this.notifyMessage.success('Sucesso', `O cliente <strong>${this.cliente.nome}</strong> foi criado com sucesso`);
            }
        );
        console.log(this.cliente);
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

    getEndereco(cep: string)
    {
        console.log("CEP:" +cep);
        if (cep!=undefined )
        {
            this.clienteHttp.getEndereco(cep).subscribe(value =>
                {
                    if (value.bairro!=undefined)
                    {
                        this.cliente.Endereco.Bairro = value.bairro; 
                        this.cliente.Endereco.Logradouro = value.logradouro; 
                        this.cliente.Endereco.Municipio = value.localidade; 
                        this.cliente.Endereco.UF = value.uf; 
                    }
                }            
            )
        }  
    }
}
