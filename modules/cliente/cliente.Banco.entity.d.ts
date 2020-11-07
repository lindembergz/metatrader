import { BaseEntity, Double } from 'typeorm';
export declare class ClienteBanco extends BaseEntity {
    Id: number;
    Nome: string;
    Agencia: string;
    Conta: string;
    TipoConta: string;
    AporteFinanceiro: Double;
    TipoMoeda: string;
}
