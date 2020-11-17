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
        ALO MUNDO
    </body>
    </html>
    `;
    //return '';//this.appService.getHello();
    
  }
  
}
