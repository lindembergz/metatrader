import {Component, OnInit, ViewChild} from '@angular/core';
import {ParticipacaoHttpService} from '../../Services/participacao-http.service';
import {Cliente,Metatrader, Participacao} from '../../models';
import {ParticipacaoNewModalComponent} from './participacao-new-modal.component';
import {ParticipacaoEditModalComponent} from '../Participacao/participacao-edit-modal.component';
import {ParticipacaoDeleteModalComponent} from '../Participacao/participacao-delete-modal.component';
import { ClienteHttpService } from 'src/app/Services/cliente-http.service';
import { MetatraderHttpService } from 'src/app/Services/metatrader-http.service';

@Component({
    selector: 'participacao-list',
    templateUrl: './participacao-list.component.html',
    styleUrls: ['./participacao-list.component.css']
})
export class ParticipacaoListComponent implements OnInit {
    participacoes: Participacao[] = [];
    clientes: Cliente[] = [];
    metatraders: Metatrader[] = []

    search = '';
    sortColumn = {column: 'Id', sort: 'asc'};
    pagination = {
        itemsPerPage: 0,
        currentPage: 0,
        totalItems: 0
    };

    showMessageSuccess = false;
    participacaoToEdit: Participacao;
    participacaoToDelete: Participacao;
    data = '2018-05-05';
    @ViewChild(ParticipacaoNewModalComponent) //pegar uma referencia de um elemento
    participacaoNewModal: ParticipacaoNewModalComponent;

    @ViewChild(ParticipacaoEditModalComponent) //pegar uma referencia de um elemento
    participacaoEditModal: ParticipacaoEditModalComponent;

    @ViewChild(ParticipacaoDeleteModalComponent) //pegar uma referencia de um elemento
    participacaoDeleteModal: ParticipacaoDeleteModalComponent;

    constructor(public participacaoHttp: ParticipacaoHttpService,
        private clienteHttp:  ClienteHttpService,
        private metatraderHttp:MetatraderHttpService ) {

        
    }

    ngOnInit() {
        this.getParticipacoes();
        this.getClientes(); 
        this.getMetatraders();
    }

    getParticipacoes() {
        this.participacaoHttp.list({
            search: this.search,
            sort: this.sortColumn,
            pagination: {
                page: this.pagination.currentPage,
                perPage: this.pagination.itemsPerPage
            }
        })
            .subscribe(response => { //{ data: [], pagination: {total: 9, current_page: 2} }                
                this.pagination.totalItems = +response.headers.get('X-Total-Count');
                this.participacoes = response.body; //{data: []}                
                //console.log(this.participacoes[0].Id);
            });
           
    }

    getClientes() {
        this.clienteHttp.list({
            search: this.search,
            sort: this.sortColumn,
            pagination: {
                page: this.pagination.currentPage,
                perPage: this.pagination.itemsPerPage
            }
        })
            .subscribe(response => { //{ data: [], pagination: {total: 9, current_page: 2} }
                
                this.pagination.totalItems = +response.headers.get('X-Total-Count');
                this.clientes = response.body; //{data: []}
                console.log('clientes '+ this.clientes.length);                
            });
        
    }

    getMetatraders() {
        this.metatraderHttp.list({
            search: this.search,
            sort: this.sortColumn,
            pagination: {
                page: this.pagination.currentPage,
                perPage: this.pagination.itemsPerPage
            }
        })
            .subscribe(response => { //{ data: [], pagination: {total: 9, current_page: 2} }
                
                this.pagination.totalItems = +response.headers.get('X-Total-Count');
                console.log('response.body;'+ response.body);
                console.log(this.pagination.totalItems);
                console.log(response.body);
                this.metatraders = response.body; //{data: []}                
            });
        
    }

    openNewModal() {               
        this.participacaoNewModal.clientes = this.clientes;   
        this.participacaoNewModal.metatraders = this.metatraders; 
        this.participacaoNewModal.show();
    }

    openEditModal(participacao: Participacao) {
        this.participacaoEditModal.clientes = this.clientes;
        this.participacaoEditModal.metatraders = this.metatraders;  
        this.participacaoToEdit = participacao;

        this.participacaoEditModal.clienteSelected= participacao.Cliente;
        this.participacaoEditModal.metatraderSelected= participacao.Metatrader;

        this.participacaoEditModal.show();
        
    }

    openDestroyModal(participacao: Participacao) {
        this.participacaoToDelete = participacao;
        this.participacaoDeleteModal.show();

    }

    onNewParticipacao(participacao: Participacao) {
        this.participacaoNewModal.participacao = participacao;
        this.showMessageSuccess = true;
         this.getParticipacoes();
    }

    onEditParticipacao(participacao: Participacao) {
       console.log(participacao);
    }

    onDestroyParticipacao(participacao: Participacao) {
        console.log(participacao);
    }
}
