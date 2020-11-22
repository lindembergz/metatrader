import { Injectable, BadRequestException } from '@nestjs/common';
import { HistoricoRepository } from './historico.repository';
import { InjectRepository } from '@nestjs/typeorm';

import { Historico } from './historico.entity';

@Injectable()
export class HistoricoService {

    constructor(
        @InjectRepository(HistoricoRepository)
        private readonly _historicoRepository: HistoricoRepository,
    )
    {      
    }


    async create(historico:Historico):Promise<Historico> 
    {        
        const saveHistorico = await this._historicoRepository.save(historico);
        return saveHistorico;
    }

    async getAll(): Promise<Historico[]>
    {
        const historicos: Historico[] = await this._historicoRepository.find();//{where: {Metatrader.id:'Active'}})//({where: {Status:'Active' }})
        return historicos;
    }
    
    async get(id:number): Promise<Historico>{
        const historico: Historico = await this._historicoRepository.
        findOne(id, {where: {Status:'Active'}});
        return historico;
    }

}
