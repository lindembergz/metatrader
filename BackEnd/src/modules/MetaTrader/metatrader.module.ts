import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetatraderRepository } from "./metatrader.repository";
import { MetatraderService } from './metatrader.service';
import { MetatraderController } from './metatrader.Controller';
import { SharedModule } from '../../shared/shared.modules';

import { Cliente } from '../cliente/cliente.entity';
import { Metatrader } from '../MetaTrader/metatrader.entity';

@Module({ imports:[
          TypeOrmModule.forFeature([MetatraderRepository]),                 
          SharedModule, ], 
          providers: [MetatraderService, ],
          controllers: [MetatraderController, ] })
export class MetatraderModule { }
