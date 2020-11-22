import {Injectable} from '@angular/core';
import {Metatrader} from '../models';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
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
export class MetatraderHttpService {

    private baseUrl = BaseURL+'metatraders';

    constructor(private http: HttpClient) {
    }

    list({search, sort, pagination}: ListHttpParams): Observable<HttpResponse<Metatrader[]>> {
        let filterObj = {
            _sort: sort.column,
            _order: sort.sort,
            _page: pagination.page + '',
            _limit: pagination.perPage + ''
        };

        if (search !== '') {
            filterObj = Object.assign({}, filterObj, {name: search});
        }
        const params = new HttpParams({
            fromObject: filterObj
        });
        return this.http.get<Metatrader[]>(this.baseUrl, {params, observe: 'response'})
            .pipe(
                catchError((responseError) => this.handleError(responseError))
            );
    }

    get(id: number): Observable<Metatrader> {
        return this.http.get<Metatrader>(`${this.baseUrl}/${id}`)
            .pipe(
                catchError((responseError) => this.handleError(responseError))
            );
    }

    create(data: Metatrader): Observable<Metatrader> {

        return this.http.post<Metatrader>(this.baseUrl, data)
            .pipe(
                catchError((responseError) => this.handleError(responseError))
            );
    }

    update(data: Metatrader): Observable<Metatrader> {
        console.log('Atualizar '+ data.Id);
        
        return this.http.put<Metatrader>(`${this.baseUrl}/${data.Id}`, data)
            .pipe(
                catchError((responseError) => this.handleError(responseError))
            );
            
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`)
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

