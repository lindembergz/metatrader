import { Controller,     
    Post,
    Get,
    Body, 
    Param,
    ParseIntPipe } from '@nestjs/common';
import { AutenticadorService } from './autenticador.service';
import {Observable } from 'rxjs';
import { Cliente } from '../cliente/cliente.entity';


@Controller('autenticador')
export class AutenticadorController {

    constructor( private readonly _autenticadorService: AutenticadorService ) { }

    @Post()
    async createAutenticador(@Body() autenticador = {Login :'',Senha :'',Soucliente:'', TipoUsuario:''}):Promise<Cliente[]>
    {
        const autenticadorCreated = await this._autenticadorService.create(
                                                autenticador.Login,
                                                autenticador.Senha,
                                                autenticador.TipoUsuario,
                                                autenticador.Soucliente );
        return autenticadorCreated;
    }

    @Get()
    async Get():Promise<string>
    {
        const autenticadorCreated = await this._autenticadorService.get(
                                                'BERG',
                                                '123','','' );
        return autenticadorCreated;
    }

}
