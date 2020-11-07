import { ClienteRepository } from './cliente.repository';
import { Cliente } from './cliente.entity';
import { ClienteView } from "./cliente.View";
export declare class ClienteService {
    private readonly _clienteRepository;
    constructor(_clienteRepository: ClienteRepository);
    get(id: number): Promise<Cliente>;
    getAll(): Promise<Cliente[]>;
    getView(): Promise<ClienteView[]>;
    create(cliente: Cliente): Promise<Cliente>;
    update(id: number, cliente: Cliente): Promise<void>;
    delete(id: number): Promise<void>;
}
