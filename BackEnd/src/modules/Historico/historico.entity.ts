import {BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    ManyToOne,
    OneToOne, 
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinColumn,
    Double}  from 'typeorm';

    import { Metatrader } from '../MetaTrader/metatrader.entity';
   

@Entity('historicos')
/*@ViewEntity({ 
    expression:`Select `**/
//npm run migration:generate "Migracao1"
//npm run migration:run "Migracao1"
export class Historico extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    Id: number;    
   
    @CreateDateColumn({type:'datetime'})
    DataHora:Date; 

    @Column({type: 'double',nullable:true})
    Valor: string;

    @ManyToMany(type => Metatrader, metatrader => metatrader.Id)
    @JoinColumn({name:'Metatrader_id'})
    Metatrader: Metatrader;

}