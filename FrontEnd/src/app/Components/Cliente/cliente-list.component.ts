import {Component, OnInit,  ViewChild} from '@angular/core';
import {ClienteHttpService} from '../../Services/cliente-http.service';
import {Cliente} from '../../models';
import {ClienteNewModalComponent} from './cliente-new-modal.component';
import {ClienteEditModalComponent} from '../Cliente/cliente-edit-modal.component';
import {ClienteDeleteModalComponent} from '../Cliente/cliente-delete-modal.component';
import { AppComponent } from 'src/app/app.component';
import { LoginController } from '../Login/login.controller';



@Component({
    selector: 'cliente-list',
    templateUrl: './cliente-list.component.html',
    styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
    clientes: Cliente[] = [];

    search = '';
    sortColumn = {column: 'Nome', sort: 'asc'};
    pagination = {
        itemsPerPage: 0,
        currentPage: 0,
        totalItems: 0
    };

    showMessageSuccess = false;
    clienteToEdit: Cliente;
    clienteToDelete: Cliente;
    data = '2018-05-05';
    @ViewChild(ClienteNewModalComponent) //pegar uma referencia de um elemento
    clienteNewModal: ClienteNewModalComponent;

    @ViewChild(ClienteEditModalComponent) //pegar uma referencia de um elemento
    clienteEditModal: ClienteEditModalComponent;

    @ViewChild(ClienteDeleteModalComponent) //pegar uma referencia de um elemento
    clienteDeleteModal: ClienteDeleteModalComponent;

    constructor(public clienteHttp: ClienteHttpService, private appComponent: AppComponent, private loginController: LoginController) {
    }

    ngOnInit() {
        this.getClientes();       
        console.log('ClienteListComponent.ngOnInit'); 

        if (!this.appComponent.usuarioAutenticado) 
        {
            this.appComponent.Logout();
        }       
    }

    ngAfterViewInit() {
        this.appComponent.mostrarMenuForce();                
    }

    getClientes() {
        console.log('ClienteListComponent.getClientes');
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
            });
        
    }

    openNewModal() {
        this.clienteNewModal.show();
        this.getClientes();
    }

    openEditModal(cliente: Cliente) {
        this.clienteToEdit = cliente;
        this.clienteEditModal.cliente= cliente;
        this.clienteEditModal.preparar();
        this.clienteEditModal.show();        
    }

    openDestroyModal(cliente: Cliente) {
       
        this.clienteToDelete = cliente;
        this.clienteDeleteModal.show();

    }

    onNewCliente(cliente: Cliente) {
        //
        this.clienteNewModal.cliente = cliente;
        this.showMessageSuccess = true;
        console.log('onNewCliente');
        this.getClientes();
    }

    onEditCliente() {
       //console.log(cliente);
    }

    onDestroyCliente() {
        //console.log(cliente);
    }
}
