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
import { ClientesHistorico} from '../cliente/cliente.entity';


@Controller('historicos')
export class HistoricoController {


    constructor( private readonly _historicoService: HistoricoService ) { }
    

    @Get(':ClienteId/:Periodo')
    async getHistorico(@Param('ClienteId', ParseIntPipe) ClienteId: number,
                       @Param('Periodo') Periodo: string,
    ):Promise<ClientesHistorico[]>
    {  
       const historico: ClientesHistorico[]  = await this._historicoService.get(ClienteId,Periodo);
       return historico;
    }

    @Post()
    async createHistorico(@Body() historico: Historico):Promise<Historico>
    {
        const historicoCreated = await this._historicoService.create(historico);
        return historicoCreated;
    }

}
