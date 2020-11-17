import {BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    OneToOne, 
    UpdateDateColumn,
    CreateDateColumn,
    JoinColumn,
    Double}  from 'typeorm';


@Entity('cliente_Enderecos')
export class ClienteEndereco extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    Id: number;
    @Column({type: 'varchar',nullable:true,length: 30}) 
    Logradouro: string;
    @Column({type: 'varchar',nullable:true,length: 5})  
    Numero: string;
    @Column({type: 'varchar',nullable:true,length: 15}) 
    Bairro: string;
    @Column({type: 'varchar',nullable:true,length: 15}) 
    Municipio: string;
    @Column({type: 'varchar',nullable:true,length: 2}) 
    UF: string;
    @Column({type: 'varchar',nullable:true,length: 8}) 
    Cep: string;
    @Column({type: 'varchar',nullable:true,length: 10}) 
    Pais: string;
}