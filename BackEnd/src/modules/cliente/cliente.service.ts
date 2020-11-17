import { Injectable, BadRequestException } from '@nestjs/common';
import { ClienteRepository } from './cliente.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, getConnection } from 'typeorm';

import { Cliente } from './cliente.entity';
import {ClienteEndereco} from './cliente.Endereco.entity';
import {ClienteConjuge} from './cliente.Conjuge.entity';
import {ClienteBanco} from './cliente.Banco.entity';
import {ClienteDocumento} from './cliente.Documento.entity';

import { ClienteView } from "./cliente.View";


@Injectable()
export class ClienteService {

    constructor(
        @InjectRepository(ClienteRepository)
        private readonly _clienteRepository: ClienteRepository,
    )
    {      
    }

    async get(id:number): Promise<Cliente>{
        if(!id)
        {
            throw new BadRequestException('Id é requerido!');
        }
        const cliente: Cliente = await this._clienteRepository.
        findOne(id, {where: {Status:'Active'}});
        if (!cliente)
        {
            throw new BadRequestException('usuario nao existe!');
        }
        return cliente;
    }

    async getAll(): Promise<Cliente[]>
    {
        const clientes: Cliente[] = await this._clienteRepository.find({where: {Status:'Active' }})
        return clientes
    }

    async getView(): Promise<ClienteView[]>
    {        
        const entityManager = getManager();
        const clientes: ClienteView[] = await entityManager.query('select * from "ClienteView"')
        return clientes
    }


    async create(cliente:Cliente):Promise<Cliente> 
    {
       /* const endereco = new ClienteEndereco();
        cliente.Endereco = endereco;

        const conjuge = new ClienteConjuge();
        cliente.Conjuge = conjuge;

        const banco = new ClienteBanco();
        cliente.Banco = banco; 

        const Documento = new ClienteDocumento();
        cliente.Documento = Documento;*/

        const saveCliente = await this._clienteRepository.save(cliente);
        return saveCliente;
    }
    async update(id:number, cliente:Cliente): Promise<void>
    {
        const repoEndereco = await getConnection().getRepository(ClienteEndereco);
        repoEndereco.save(cliente.Endereco);

        const repoConjuge = await getConnection().getRepository(ClienteConjuge);
        repoConjuge.save(cliente.Conjuge);

        const repoBanco = await getConnection().getRepository(ClienteBanco);
        repoBanco.save(cliente.Banco);

        const repoDocumento= await getConnection().getRepository(ClienteDocumento);
        repoDocumento.save(cliente.Documento);
        
       await this._clienteRepository.update(id, cliente);        
    }

    async delete(id:number): Promise<void>
    {
        const clienteExists = await this._clienteRepository.
        findOne(id, {where: {Status:'Active'}});

        if(!clienteExists)
        {
            throw new BadRequestException('Cliente nao existe!');  
        }
        await this._clienteRepository.delete(id);
     
    }

}
