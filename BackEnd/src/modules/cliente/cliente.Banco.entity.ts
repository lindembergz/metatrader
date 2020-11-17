import {BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    OneToOne, 
    UpdateDateColumn,
    CreateDateColumn,
    JoinColumn,
    Double}  from 'typeorm';


@Entity('cliente_Bancos')
export class ClienteBanco extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    Id: number;
    @Column({type: 'varchar',nullable:true,length: 15}) 
    Nome: string; 
    @Column({type: 'varchar',nullable:true,length: 6}) 
    Agencia: string; 
    @Column({type: 'varchar',nullable:true,length: 8}) 
    Conta: string; 
    @Column({type: 'varchar',nullable:true,length: 10}) 
    TipoConta: string; 
    @Column({type: 'real',nullable:true, default:0}) 
    AporteFinanceiro: Double; 
    @Column({type: 'varchar',nullable:true,length: 15}) 
    TipoMoeda: string; 
}





