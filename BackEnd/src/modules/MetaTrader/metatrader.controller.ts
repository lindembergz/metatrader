import { Controller, 
    Get, 
    Post,
    Put,
    Delete, 
    Body, 
    Param,
    ParseIntPipe } from '@nestjs/common';
import { MetatraderService } from './metatrader.service';
import { Metatrader } from './metatrader.entity';


@Controller('metatraders')
export class MetatraderController {


    constructor( private readonly _metatraderService: MetatraderService ) { }
    
    @Get(':id')
    async getMetatrader(@Param('id', ParseIntPipe) id: number):Promise<Metatrader>
    {
        const metatrader = await this._metatraderService.get(id)
        return metatrader;
    }

    @Get()
    async getMetatraders():Promise<Metatrader[]>
    {
        const metatraders = await this._metatraderService.getAll()
        return metatraders;
    }


    @Post()
    async createMetatrader(@Body() metatrader: Metatrader):Promise<Metatrader>
    {
        const metatraderCreated = await this._metatraderService.create(metatrader);
        return metatraderCreated;
    }

    @Put(':id')
    async updateMetatrader(@Param('id', ParseIntPipe) id:number, @Body() cliente: Metatrader)
    {
        await this._metatraderService.update(id,cliente);     
        return true;      
    }

    @Delete(':id')
    async DeleteMetatrader(@Param('id', ParseIntPipe) id:number)
    {
        await this._metatraderService.delete(id);
        return true;
        
    }
}
