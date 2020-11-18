import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { HistoricoRepository } from "./historico.repository";
import { HistoricoService } from './historico.service';
import { HistoricoController } from './historico.controller';
import { SharedModule } from '../../shared/shared.modules';


import { Historico } from '../Historico/historico.entity';

@Module({ imports:[
          TypeOrmModule.forFeature([HistoricoRepository]),                 
          SharedModule, ], 
          providers: [HistoricoService, ],
          controllers: [HistoricoController, ] })
export class HistoricoModule { }
