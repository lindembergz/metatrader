import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParticipacaoRepository } from "./participacao.repository";
import { ParticipacaoService } from './participacao.service';
import { ParticipacaoController } from './participacao.controller';
import { SharedModule } from '../../shared/shared.modules';

@Module({ imports:[
          TypeOrmModule.forFeature([ParticipacaoRepository]),                 
          SharedModule, ], 
          providers: [ParticipacaoService, ],
          controllers: [ParticipacaoController, ] })
export class ParticipacaoModule { }
