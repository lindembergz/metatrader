import { Module } from '@nestjs/common';
import { AutenticadorService } from './autenticador.service';
import { AutenticadorController } from './autenticador.controller';
import { SharedModule } from '../../shared/shared.modules';

@Module({ imports:[               
          SharedModule, ], 
          providers: [AutenticadorService, ],
          controllers: [AutenticadorController, ] })
export class AutenticadorModule { }
