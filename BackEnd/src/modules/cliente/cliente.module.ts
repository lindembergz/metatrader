import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteRepository } from "./cliente.repository";
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.Controller';
import { SharedModule } from '../../shared/shared.modules';
import { ParticipacaoRepository } from '../Participacao/participacao.repository';


@Module({ imports:[
          TypeOrmModule.forFeature([ClienteRepository,ParticipacaoRepository]),                 
          SharedModule, ], 
          providers: [ClienteService, ],
          controllers: [ClienteController, ] })
export class ClienteModule { }
