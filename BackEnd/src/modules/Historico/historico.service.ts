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


}
