import {BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    OneToOne, 
    OneToMany,
    JoinColumn,
    ManyToMany,
    JoinTable
    }  from 'typeorm';

import {ClienteEndereco} from './cliente.Endereco.entity';
import {ClienteConjuge} from './cliente.Conjuge.entity';
import {ClienteBanco} from './cliente.Banco.entity';
import {ClienteDocumento} from './cliente.Documento.entity';
import { Participacao } from '../Participacao/participacao.entity';
import { Metatrader } from '../MetaTrader/metatrader.entity';


@Entity('clientes')
/*@ViewEntity({ 
    expression:`Select `**/
//npm run migration:generate "Migracao1"
//npm run migration:run "Migracao1"
export class Cliente extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    Id: number;    
    @Column({type: 'varchar',unique: true,length:50,nullable:false})
    Nome: string; 
    @Column({type: 'varchar',nullable:true, default:'Active',length: 10})
    Status: string;
    @Column({type: 'varchar',nullable:true, length: 40})
    Email: string;
    @Column({type: 'varchar',nullable:true, length: 30})
    Celular: string;
    @Column({type: 'date',nullable:true})
    DataNascimento:Date; 
    @Column({type: 'varchar',nullable:true, length: 30})
    Profissao: string; 
    @Column({type: 'varchar',nullable:true, length: 15})
    Nacionalidade: string; 
    @Column({type: 'varchar',nullable:true, length: 14}) 
    ResponsavelLegal: string;
    @Column({type: 'varchar',length:20,nullable:true})
    Login: string;
    @Column({type: 'varchar',nullable:true, length: 8})
    Senha: string;  
    @Column({type: 'varchar',nullable:true,length: 14}) 
    EstadoCivil:string;

    @OneToOne(type=>ClienteEndereco,{cascade:true,nullable:false, eager: true})
    @JoinColumn({name:'Endereco_id'})
    Endereco: ClienteEndereco;
 
    @OneToOne(type=>ClienteDocumento,{cascade:true,nullable:false, eager: true})
    @JoinColumn({name:'Documento_id'})
     Documento: ClienteDocumento;  

    @OneToOne(type=>ClienteConjuge,{cascade:true,nullable:false, eager: true})
    @JoinColumn({name:'Conjuge_id'})
     Conjuge: ClienteConjuge;

    @OneToOne(type=>ClienteBanco,{cascade:true,nullable:false, eager: true})
    @JoinColumn({name:'Banco_id'})
     Banco: ClienteBanco;

    @OneToMany(type => Participacao, participacao => participacao.Cliente)
    @JoinColumn({name:'Cliente_id'})
    Participacao: Participacao[];

}