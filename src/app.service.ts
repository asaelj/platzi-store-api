import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    private config: ConfigService,
    @Inject('Ricks') private ricks: any[],
  ) {}

  getHello(): string {
    return `Hello World! KEY: ${this.config.get('API_KEY')} DB: ${this.config.get('DATABASE_NAME')}`;
  }

  getTasks(): any {
    return {
      ricks: this.ricks || [],
    };
  }
}
