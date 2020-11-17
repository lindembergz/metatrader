import {BaseEntity, 
    Entity, 
    Column,
    PrimaryGeneratedColumn,
    OneToOne, 
    JoinColumn,
    ManyToOne,
    JoinTable,
    Double}  from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Metatrader } from '../MetaTrader/metatrader.entity';

@Entity('participacoes')
/*@ViewEntity({ 
    expression:`Select `**/
//npm run migration:generate "Migracao1"
//npm run migration:run "Migracao1"
export class Participacao extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    Id: number;        

   /* @ManyToMany(type=>Metatrader)
    @JoinTable()
    Metatrader: Metatrader[];*/

   /* @ManyToOne(type=>Cliente,{cascade:true,nullable:false, eager: true})
    @JoinColumn({name:'Banco_id'})
    Cliente: Cliente;

    @ManyToOne(type=>Metatrader,{cascade:true,nullable:false, eager: true})
    @JoinColumn({name:'Metatrader_id'})
    Metatrader: Metatrader;*/
    @ManyToOne(type => Cliente, cliente => cliente.Id)
    @JoinColumn({name:'Cliente_id'})
    Cliente: Cliente;

    @ManyToOne(type => Metatrader, metatrader => metatrader.Id)
    @JoinColumn({name:'Metatrader_id'})
    Metatrader: Metatrader;

    @Column({type: 'varchar',nullable:true, default:'Active',length: 10})
    Status: string;
    
    @Column({type: 'real',nullable:true, default:0}) 
    Percentual: Double;
}