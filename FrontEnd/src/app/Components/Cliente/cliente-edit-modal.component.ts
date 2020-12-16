import {Component, ElementRef, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ClienteHttpService} from '../../Services/cliente-http.service';
import {Cliente} from '../../models';
import {  FormGroup, FormControl, Validators } from '@angular/forms';

declare const $;

@Component({
    selector: 'cliente-edit-modal',
    templateUrl: './cliente-detail-modal.component.html',
    styleUrls: ['./cliente-modal.component.css']
})
export class ClienteEditModalComponent implements OnInit {

    public userForm: FormGroup;

    @Input()
    cliente: Cliente;

    @Output()
    onSubmit: EventEmitter<Cliente> = new EventEmitter<Cliente>();

    constructor(private element: ElementRef, private clienteHttp: ClienteHttpService) {
    }

    ngOnInit() {
        
           
    }

    SaveCliente() {      
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

    preparar()
    {
        this.userForm = new FormGroup({
            'nome': new FormControl(this.cliente.Nome, [Validators.required]),
            'datanascimento': new FormControl(this.cliente.DataNascimento, [Validators.required]),  
            'profissao': new FormControl(this.cliente.Profissao, [Validators.required]), 
            'nacionalidade': new FormControl(this.cliente.Nacionalidade, [Validators.required]), 
            'estadocivil': new FormControl(this.cliente.EstadoCivil, [Validators.required]),  
            'cpf': new FormControl(this.cliente.Documento.CPF, [Validators.required]), 
            'rg': new FormControl(this.cliente.Documento.RG, [Validators.required]), 
            'logradouro': new FormControl(this.cliente.Endereco.Logradouro, [Validators.required]), 
            'numero': new FormControl(this.cliente.Endereco.Numero, [Validators.required]), 
            'bairro': new FormControl(this.cliente.Endereco.Bairro, [Validators.required]), 
            'municipio': new FormControl(this.cliente.Endereco.Municipio, [Validators.required]), 
            'uf': new FormControl(this.cliente.Endereco.UF, [Validators.required]),        
            'cep' : new FormControl(this.cliente.Endereco.Cep, [Validators.required]), 
            'banco': new FormControl(this.cliente.Banco.Nome, [Validators.required]), 
            'agencia': new FormControl(this.cliente.Banco.Agencia, [Validators.required]), 
            'conta': new FormControl(this.cliente.Banco.Conta, [Validators.required]), 
            'moeda': new FormControl(this.cliente.Banco.TipoMoeda, [Validators.required]), 
            'aporte': new FormControl(this.cliente.Banco.AporteFinanceiro, [Validators.required]), 
            'celular': new FormControl(this.cliente.Celular, [Validators.required]),
            'login': new FormControl(this.cliente.Login, [Validators.required]),            
            'confimaSenha': new FormControl(this.cliente.ConfirmaSenha, [Validators.required]),
            'senha': new FormControl(this.cliente.Senha, [Validators.required]),
           });

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
