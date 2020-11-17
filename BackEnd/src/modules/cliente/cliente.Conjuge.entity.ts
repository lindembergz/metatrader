import {BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    OneToOne, 
    UpdateDateColumn,
    CreateDateColumn,
    JoinColumn,
    Double}  from 'typeorm';


@Entity('cliente_Conjuges')
export class ClienteConjuge extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    Id: number;
    @Column({type: 'varchar',nullable:true,length: 50}) 
    Nome: string;
    @Column({type: 'varchar',nullable:true,length: 14})   
    CPF: string;  
    @Column({type: 'varchar',nullable:true,length: 10}) 
    RG: string;  
    @Column({type: 'varchar',nullable:true,length: 12}) 
    Celular: string; 
}


