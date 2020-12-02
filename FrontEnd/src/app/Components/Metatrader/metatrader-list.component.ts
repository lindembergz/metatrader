import {Component, OnInit, ViewChild} from '@angular/core';
import {MetatraderHttpService} from '../../Services/metatrader-http.service';
import {Metatrader} from '../../models';
import {MetatraderNewModalComponent} from './metatrader-new-modal.component';
import {MetatraderEditModalComponent} from '../Metatrader/metatrader-edit-modal.component';
import {MetatraderDeleteModalComponent} from '../Metatrader/metatrader-delete-modal.component';
import { AppComponent } from 'src/app/app.component';


@Component({
    selector: 'metatrader-list',
    templateUrl: './metatrader-list.component.html',
    styleUrls: ['./metatrader-list.component.css']
})
export class MetatraderListComponent implements OnInit {
    metatraders: Metatrader[] = [];

    search = '';
    sortColumn = {column: 'Servidor', sort: 'asc'};
    pagination = {
        itemsPerPage: 0,
        currentPage: 0,
        totalItems: 0
    };

    showMessageSuccess = false;
    metatraderToEdit: Metatrader;
    metatraderToDelete: Metatrader;
    data = '2018-05-05';
    @ViewChild(MetatraderNewModalComponent) //pegar uma referencia de um elemento
    metatraderNewModal: MetatraderNewModalComponent;

    @ViewChild(MetatraderEditModalComponent) //pegar uma referencia de um elemento
    metatraderEditModal: MetatraderEditModalComponent;

    @ViewChild(MetatraderDeleteModalComponent) //pegar uma referencia de um elemento
    metatraderDeleteModal: MetatraderDeleteModalComponent;

    constructor(public metatraderHttp: MetatraderHttpService, private appComponent: AppComponent) {
    }

    ngOnInit() {
        this.getMetatraders();
        //this.appComponent.VerifyAutentication;
        if (!this.appComponent.usuarioAutenticado) 
        {
            this.appComponent.Logout();
        } 
    }

    ngAfterViewInit() {
        this.appComponent.mostrarMenuForce();

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
        this.metatraderNewModal.show();
        this.getMetatraders();
    }

    openEditModal(metatrader: Metatrader) {
        this.metatraderToEdit = metatrader;
        this.metatraderEditModal.show();
    }

    openDestroyModal(metatrader: Metatrader) {
        this.metatraderToDelete = metatrader;
        this.metatraderDeleteModal.show();

    }

    onNewMetatrader(metatrader: Metatrader) {
        //
        this.metatraderNewModal.metatrader = metatrader;
        this.showMessageSuccess = true;
         this.getMetatraders();
    }

    onEditMetatrader(metatrader: Metatrader) {
       console.log(metatrader);
    }

    onDestroyMetatrader(metatrader: Metatrader) {
        console.log(metatrader);
    }
}
