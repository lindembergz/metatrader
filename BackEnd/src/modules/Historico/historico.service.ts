import { Injectable, BadRequestException } from '@nestjs/common';
import { HistoricoRepository } from './historico.repository';
import { InjectRepository  } from '@nestjs/typeorm';

import { getManager, getConnection } from 'typeorm';

import { Historico } from './historico.entity';
import { ClientesHistorico} from '../cliente/cliente.entity';

@Injectable()
export class HistoricoService {

    constructor(
        @InjectRepository(HistoricoRepository)
        private readonly _historicoRepository: HistoricoRepository,
    )
    {      
    }


    async create(historico:Historico):Promise<any> 
    {        
        const entityManager = getManager();        
            
        let SelectSQL = `Select Id From metatraders where Login="${historico.Metatrader.Login}"`;

        let metatrade_id = await entityManager.query(SelectSQL).
        then( (value)=>{
            let insertSQL = `insert into historicos( DataHora, Valor , Metatrade_Id) values ( "${historico.DataHora}T00:00:00.0", ${historico.Valor}, ${value[0].Id} )`;
            const saveHistorico = entityManager.query(insertSQL);
            return saveHistorico;
        } );
 
    }

    async getAll(): Promise<Historico[]>
    {
        const historicos: Historico[] = await this._historicoRepository.find();//{where: {Metatrader.id:'Active'}})//({where: {Status:'Active' }})
        return historicos;
    }
    
    async get(ClienteId:number): Promise<ClientesHistorico[]>{

        const entityManager = getManager();
        let  historico: ClientesHistorico[] = await entityManager.query(
                                           `select 
                                                meta.Login , 
                                                hist.Valor , 
                                                hist.DataHora
                                            from 
                                                clientes cli
                                                inner join participacoes part
                                                on cli.Id = part.Cliente_Id
                                                inner join historicos hist 
                                                on hist.Metatrade_Id = part.Metatrader_id 
                                                inner join metatraders meta 
                                                on meta.Id = hist.Metatrade_Id                                            
                                            where 
                                                cli.Id = ${ClienteId}`);
        return historico;
    }

}
