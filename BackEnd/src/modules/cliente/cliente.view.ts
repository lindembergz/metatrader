import { ViewEntity, ViewColumn, Connection } from "typeorm";
import { Cliente } from './cliente.entity';


@ViewEntity({
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("clientes.Id", "Id")
        .addSelect("clientes.Nome", "clientes")
        .from(Cliente, "clientes")
})
export class ClienteView {
    @ViewColumn()
    Id: number;
    @ViewColumn()
    Nome: string;
    @ViewColumn()
    Login: string;
}

