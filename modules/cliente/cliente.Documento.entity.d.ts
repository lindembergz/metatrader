import { BaseEntity } from 'typeorm';
export declare class ClienteDocumento extends BaseEntity {
    Id: number;
    CPF: string;
    RG: string;
    DataEmissaoRG: Date;
    OrgaoExpeditorRG: string;
}
