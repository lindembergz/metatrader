import {BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    OneToOne, 
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinColumn,
    Double}  from 'typeorm';
    import { Cliente } from '../Cliente/cliente.entity';

@Entity('metatraders')
/*@ViewEntity({ 
    expression:`Select `**/
//npm run migration:generate "Migracao1"
//npm run migration:run "Migracao1"
export class Metatrader extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    Id: number;    
    @Column({type: 'varchar',unique: true,length:50,nullable:false})
    Servidor: string;
    @Column({type: 'varchar',length:20,nullable:true})
    Login: string;
    @Column({type: 'varchar',nullable:true, length: 8})
    Senha: string; 
    @Column({type: 'varchar',nullable:true, default:'Active',length: 10})
    Status: string;
}