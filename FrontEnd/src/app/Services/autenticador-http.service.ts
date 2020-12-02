import {Injectable , EventEmitter} from '@angular/core';
import {Usuario, Cliente} from '../models';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BaseURL} from '../constants';

interface ListHttpParams {
    search;
    sort: { column, sort };
    pagination: {
        page: number;
        perPage: number;
    };
}

@Injectable({
    providedIn: 'root'
})
export class AutenticadorHttpService {


    usuarioAutenticadoMenuEmitter = new EventEmitter<boolean>();


    private baseUrl = BaseURL+'autenticador';

    constructor(private http: HttpClient) {
    }


    create(usuario: Usuario): Observable<Cliente[]> {

        console.log('LoginCliente(usuario: Usuario)'); 
         return this.http.post<Cliente[]>(this.baseUrl, usuario)
                .pipe(
                    catchError((responseError) => this.handleError(responseError))
                );      
    }

    get(usuario: Usuario):  Observable<string> {

        console.log('get'); 
         return  this.http.get<string>(`${this.baseUrl}`);
         
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error);
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Erro: ${error.error.message}`;
        } else {
            //422
            // backend-side error
            errorMessage = `Erro: código - ${error.status}<br>, Mensagem: ${error.message}`;
        }

        return throwError(error);
    }
}

