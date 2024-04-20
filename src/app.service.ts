import { Injectable, Inject } from '@nestjs/common';
import { /*ConfigService,*/ ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    // private config: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('Ricks') private ricks: any[],
  ) {}

  getHello(): string {
    return `Environments: ${this.configService.apiKey} DB: ${this.configService.database.name} Port: ${this.configService.database.port}`;
    // return `Hello World! KEY: ${this.config.get('API_KEY')} DB: ${this.config.get<string>('DATABASE_NAME')}`;
  }

  getTasks(): any {
    return {
      ricks: this.ricks || [],
    };
  }
}
