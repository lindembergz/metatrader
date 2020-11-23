import {Injectable} from '@angular/core';
import {ClientesHistorico} from '../models';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BaseURL} from '../constants';

@Injectable({
    providedIn: 'root'
})
export class HistoricoHttpService {

    private baseUrl = BaseURL+'historicos';

    constructor(private http: HttpClient) {
    }


    get(ClienteId: number): Observable<ClientesHistorico[]> {
        return this.http.get<ClientesHistorico[]>(`${this.baseUrl}/${ClienteId}`)
            .pipe(
                catchError((responseError) => this.handleError(responseError))
            );
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

