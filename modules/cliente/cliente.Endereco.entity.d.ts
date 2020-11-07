import { BaseEntity } from 'typeorm';
export declare class ClienteEndereco extends BaseEntity {
    Id: number;
    Logradouro: string;
    Numero: string;
    Bairro: string;
    Municipio: string;
    UF: string;
    Cep: string;
    Pais: string;
}
