import { BaseEntity } from 'typeorm';
import { ClienteEndereco } from './cliente.Endereco.entity';
import { ClienteConjuge } from './cliente.Conjuge.entity';
import { ClienteBanco } from './cliente.Banco.entity';
import { ClienteDocumento } from './cliente.Documento.entity';
export declare class Cliente extends BaseEntity {
    Id: number;
    Nome: string;
    Status: string;
    Email: string;
    Celular: string;
    DataNascimento: Date;
    Profissao: string;
    Nacionalidade: string;
    ResponsavelLegal: string;
    Login: string;
    Senha: string;
    EstadoCivil: string;
    Endereco: ClienteEndereco;
    Documento: ClienteDocumento;
    Conjuge: ClienteConjuge;
    Banco: ClienteBanco;
}
