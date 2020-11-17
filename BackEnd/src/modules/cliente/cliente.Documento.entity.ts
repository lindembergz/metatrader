import {BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    OneToOne, 
    UpdateDateColumn,
    CreateDateColumn,
    JoinColumn,
    Double}  from 'typeorm';


@Entity('cliente_Documentos')
export class ClienteDocumento extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    Id: number;
    @Column({type: 'varchar',nullable:true, length: 15}) 
    CPF: string; 
    @Column({type: 'varchar',nullable:true, length: 10}) 
    RG: string; 
    @Column({type: 'date',nullable:true}) 
    DataEmissaoRG: Date; 
    @Column({type: 'varchar',nullable:true,length: 15}) 
    OrgaoExpeditorRG: string; 
}








