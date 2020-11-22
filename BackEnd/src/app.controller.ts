import { Controller, Get,Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string{
    return `
    <html>
    <body>
        Oi ?
    </body>
    </html>
    `;
    //return '';//this.appService.getHello();
    
  }
  
}
