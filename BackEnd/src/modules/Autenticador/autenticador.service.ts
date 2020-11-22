import { Injectable, BadRequestException } from '@nestjs/common';

import { ClienteRepository } from '../cliente/cliente.repository';
import { InjectRepository } from '@nestjs/typeorm';

import { Cliente } from '../cliente/cliente.entity';
import { getManager, getConnection } from 'typeorm';


@Injectable()
export class AutenticadorService {

   /* constructor( @InjectRepository(ClienteRepository)
    private readonly _clienteRepository: ClienteRepository,)
    {      
    }*/

    async create(Login: string , Senha: string, TipoUsuario: string, SouCliente: string ):Promise<Cliente[]> 
    {
        
        if (TipoUsuario = 'Cliente')
        {            
            const entityManager = getManager();
            let  cliente: Cliente[] = await entityManager.query(`select * from clientes where Login = '${Login}' and Senha='${Senha}'`);
            return cliente; 
        }        

    }

    async get(Login: string , Senha: string, TipoUsuario: string, SouCliente: string  ): Promise<string>
    {   
            const entityManager = getManager();
            let  cliente: Cliente[] = await entityManager.query(`select * from clientes where Login = '${Login}' and Senha='${Senha}'`);
            return cliente[0].Nome;
     

    }


}
