import { Controller, 
    Get, 
    Post,
    Put,
    Delete, 
    Body, 
    Param,
    ParseIntPipe } from '@nestjs/common';
import { ParticipacaoService } from './participacao.service';
import { Participacao } from './participacao.entity';


@Controller('participacoes')
export class ParticipacaoController {


    constructor( private readonly _ParticipacaoService: ParticipacaoService ) { }
    
    @Get(':id')
    async getParticipacao(@Param('id', ParseIntPipe) id: number):Promise<Participacao>
    {
        const entidade = await this._ParticipacaoService.get(id)
        return entidade;
    }

    @Get()
    async getParticipacoes():Promise<Participacao[]>
    {
        const Lista = await this._ParticipacaoService.getAll()
        return Lista;
    }

    @Post()
    async createParticipacao(@Body() entidade: Participacao):Promise<Participacao>
    {
        const Created = await this._ParticipacaoService.create(entidade);
        return Created;
    }

    @Put(':id')
    async updateParticipacao(@Param('id', ParseIntPipe) id:number, @Body() entidade: Participacao)
    {
        await this._ParticipacaoService.update(id,entidade);     
        return true;      
    }

    @Delete(':id')
    async DeleteParticipacao(@Param('id', ParseIntPipe) id:number)
    {
        await this._ParticipacaoService.delete(id);
        return true;
        
    }
}
