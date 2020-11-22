import { Controller, 
    Get, 
    Post,
    Put,
    Delete, 
    Body, 
    Param,
    ParseIntPipe } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { ClienteView } from "./cliente.view";

@Controller('clientes')
export class ClienteController {


    constructor( private readonly _clienteService: ClienteService ) { }
    
    @Get(':id')
    async getCliente(@Param('id', ParseIntPipe) id: number):Promise<Cliente>
    {
        const cliente = await this._clienteService.get(id)
        return cliente;
    }

    @Get()
    async getClientes():Promise<Cliente[]>
    {
        const clientes = await this._clienteService.getAll()
        return clientes;
    }

    @Get('view')
    async getClientesView():Promise<ClienteView[]>
    {
        const clientes = await this._clienteService.getView()
        return clientes;
    }

    /*
    @Post('getByLogin')
    async getByLogin(@Body() cliente: Cliente):Promise<Cliente>
    {
      const clienteCreated = await this._clienteService.getByLogin(cliente);
      return clienteCreated;
    }
    */

    @Post()
    async createCliente(@Body() cliente: Cliente):Promise<Cliente>
    {
        const clienteCreated = await this._clienteService.create(cliente);
        return clienteCreated;
    }

    @Put(':id')
    async updateCliente(@Param('id', ParseIntPipe) id:number, @Body() cliente: Cliente)
    {
        await this._clienteService.update(id,cliente);     
        return true;      
    }

    @Delete(':id')
    async DeleteCliente(@Param('id', ParseIntPipe) id:number)
    {
        await this._clienteService.delete(id);
        return true;
        
    }
}
