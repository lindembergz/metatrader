import { Injectable, BadRequestException } from '@nestjs/common';
import { ParticipacaoRepository } from './participacao.repository';
import { InjectRepository } from '@nestjs/typeorm';

import { Participacao } from './participacao.entity';

@Injectable()
export class ParticipacaoService {

    constructor(
        @InjectRepository(ParticipacaoRepository)
        private readonly _ParticipacaoRepository: ParticipacaoRepository,
    )
    {      
    }

    async get(id:number): Promise<Participacao>{
        if(!id)
        {
            throw new BadRequestException('Id é requerido!');
        }
        const entidade: Participacao = await this._ParticipacaoRepository.
        findOne(id, {where: {Status:'Active'}});
        if (!entidade)
        {
            throw new BadRequestException('usuario nao existe!');
        }
        return entidade;
    }

    async getAll(): Promise<Participacao[]>
    {
        const lista: Participacao[] = await this._ParticipacaoRepository.find({ relations: ["Cliente","Metatrader"] }  )
        return lista
    }


    async create(entidade:Participacao):Promise<Participacao> 
    {
        const saveEntidade = await this._ParticipacaoRepository.save(entidade);
        return saveEntidade;
    }
    async update(id:number, entidade:Participacao): Promise<void>
    {
       
       await this._ParticipacaoRepository.update(id, entidade);        
    }

    async delete(id:number): Promise<void>
    {
        const entidadeExists = await this._ParticipacaoRepository.
        findOne(id, {where: {Status:'Active'}});

        if(!entidadeExists)
        {
            throw new BadRequestException('Metatrader nao existe!');  
        }
        await this._ParticipacaoRepository.delete(id);
     
    }

}
