import {Injectable} from '@angular/core';
import {Cliente} from '../models';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
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
export class ClienteHttpService {

    private baseUrl = BaseURL+'clientes';
  
     httpOptions = {
        headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Authorization':'authkey',
          'userid':'1',
          'Access-Control-Allow-Methods':
          'GET,PUT,POST,DELETE,getByLogin,OPTIONS',
          'Access-Control-Allow-Headers': 
          'Content-Type, Authorization, Content-Length, X-Requested-With, Accept'
        })
      };

    
      errorHandler(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
     }

    constructor(private http: HttpClient) {
    }

    list({search, sort, pagination}: ListHttpParams): Observable<HttpResponse<Cliente[]>> {
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
        return this.http.get<Cliente[]>(this.baseUrl, {params, observe: 'response'})
            .pipe(
                catchError((responseError) => this.handleError(responseError))
            );
    }

    get(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.baseUrl}/${id}`)
            .pipe(
                catchError((responseError) => this.handleError(responseError))
            );
    }

    getByLogin( login: string , senha: string ): Observable<Cliente> {     

        let data:  Cliente = {
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

        data.Login = login;
        data.Senha = senha;
        this.httpOptions

        
        return  this.http.post<Cliente>('http://127.0.0.1:4000/api/clientes/getByLogin',
                                        JSON.stringify('{"Cliente":{"Login":"BERG","Senha":"123"}}'),
                                        {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }})
                .pipe(
                    catchError((responseError) => this.handleError(responseError))
                );                  
    }   

    create(data: Cliente): Observable<Cliente> {

        return this.http.post<Cliente>(this.baseUrl, data)
            .pipe(
                catchError((responseError) => this.handleError(responseError))
            );
    }

    update(data: Cliente): Observable<Cliente> {
        console.log('Atualizar '+ data.Id);
        
        return this.http.put<Cliente>(`${this.baseUrl}/${data.Id}`, data)
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

