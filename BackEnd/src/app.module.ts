import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.key';
import { DatabaseModule } from './database/database.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { MetatraderModule } from './modules/MetaTrader/metatrader.module';
import { ParticipacaoModule } from './modules/Participacao/participacao.module';

@Module({  
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule, 
    DatabaseModule, 
    ClienteModule,
    MetatraderModule,
    ParticipacaoModule,
  
  ],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService){
    AppModule.port= this._configService.get(Configuration.PORT)

  }

}
