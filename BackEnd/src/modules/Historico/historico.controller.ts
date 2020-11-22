import { Controller, 
    Get, 
    Post,
    Put,
    Delete, 
    Body, 
    Param,
    ParseIntPipe } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import { Historico } from './historico.entity';


@Controller('historicos')
export class HistoricoController {


    constructor( private readonly _historicoService: HistoricoService ) { }
    
    //@Get(':id')
    @Get()
    async gethistoricos():Promise<Historico[]>
    {
        const historico = await this._historicoService.getAll()
        return historico;
    }

    @Post()
    async createHistorico(@Body() historico: Historico):Promise<Historico>
    {
        const historicoCreated = await this._historicoService.create(historico);
        return historicoCreated;
    }

}
