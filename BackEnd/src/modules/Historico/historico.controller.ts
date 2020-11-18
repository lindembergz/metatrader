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
    


    @Post()
    async createHistorico(@Body() historico: Historico):Promise<Historico>
    {
        const historicoCreated = await this._historicoService.create(historico);
        return historicoCreated;
    }

}
