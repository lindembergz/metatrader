import { Injectable, BadRequestException } from '@nestjs/common';
import { MetatraderRepository } from './metatrader.repository';
import { InjectRepository } from '@nestjs/typeorm';

import { Metatrader } from './metatrader.entity';

@Injectable()
export class MetatraderService {

    constructor(
        @InjectRepository(MetatraderRepository)
        private readonly _metatraderRepository: MetatraderRepository,
    )
    {      
    }

    async get(id:number): Promise<Metatrader>{
        if(!id)
        {
            throw new BadRequestException('Id é requerido!');
        }
        const metatrader: Metatrader = await this._metatraderRepository.
        findOne(id, {where: {Status:'Active'}});
        if (!metatrader)
        {
            throw new BadRequestException('usuario nao existe!');
        }
        return metatrader;
    }

    async getAll(): Promise<Metatrader[]>
    {
        const metatraders: Metatrader[] = await this._metatraderRepository.find({where: {Status:'Active' }})
        return metatraders
    }


    async create(metatrader:Metatrader):Promise<Metatrader> 
    {
        const saveMetatrader = await this._metatraderRepository.save(metatrader);
        return saveMetatrader;
    }
    async update(id:number, metatrader:Metatrader): Promise<void>
    {
       
       await this._metatraderRepository.update(id, metatrader);        
    }

    async delete(id:number): Promise<void>
    {
        const metatraderExists = await this._metatraderRepository.
        findOne(id, {where: {Status:'Active'}});

        if(!metatraderExists)
        {
            throw new BadRequestException('Metatrader nao existe!');  
        }
        await this._metatraderRepository.delete(id);
     
    }

}
