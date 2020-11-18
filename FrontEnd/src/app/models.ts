export interface Usuario{
  email: string;
  senha: string;

}

export interface Metatrader {
    Id: number;
    Servidor: string;
    Login?: string;
    Senha?: string; 
}

export interface Cliente {
    Id: number;
    Nome: string;
    Login?: string;
    
    Senha?: string;
    Celular?: string; 
    DataNascimento?: string;
    Profissao?: string;
    Nacionalidade?: string;
    EstadoCivil?: string;
    Responsavel?: string;
    Status?: string;
    Documento: ClienteDocumento;  
    Endereco:ClienteEndereco; 
    Banco: ClienteBanco;
    Conjuge: ClienteConjuge;  
}

export interface Participacao {
    Id: number;
    Percentual?:number;
    Status?: string;
    Cliente  : Cliente;  
    Metatrader  : Metatrader; 
}

export interface ClienteEndereco {
    Id?: number;
    Logradouro?: string;
    Numero?: string;
    Bairro?: string;
    Municipio?: string;
    UF?: string; 
    Cep?: string;
    Pais?: string;
}

export interface ClienteBanco {
    Id?: number;
    Nome?: string;
    Agencia?: string; 
    Conta?: string; 
    TipoConta?: string; 
    AporteFinanceiro?:number;
    TipoMoeda?: string;  
}

export interface ClienteConjuge {
    Id?: number;
    Nome?: string; 
    CPF?: string; 
    RG?: string; 
    Celular?: string;
}

export interface ClienteDocumento {
    Id?: number;
    CPF?: string;
    RG?: string; 
    DataEmissaoRG?: Date; 
    OrgaoExpeditorRG?: string; 
}



