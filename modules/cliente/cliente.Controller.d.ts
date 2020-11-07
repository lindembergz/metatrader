import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { ClienteView } from "./cliente.view";
export declare class ClienteController {
    private readonly _clienteService;
    constructor(_clienteService: ClienteService);
    getCliente(id: number): Promise<Cliente>;
    getClientes(): Promise<Cliente[]>;
    getClientesView(): Promise<ClienteView[]>;
    createCliente(cliente: Cliente): Promise<Cliente>;
    updateCliente(id: number, cliente: Cliente): Promise<boolean>;
    DeleteCliente(id: number): Promise<boolean>;
}
