import {Injectable , EventEmitter} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BaseURL} from '../constants';

@Injectable({
    providedIn: 'root'
})
export class RecuperaSenhaHttpService {

    private baseUrl = BaseURL+'recuperar';

    constructor(private http: HttpClient) {
    }


    recuperarSenha(email: string): Observable<any> {
         return this.http.post<any>(this.baseUrl, {Email:email})
                .pipe( catchError( ( responseError ) => this.handleError( responseError ) ) );      
 
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

