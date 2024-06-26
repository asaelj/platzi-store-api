import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_NAME: joi.string().required(),
        DATABASE_PORT: joi.number().required(),
        API_KEY: joi.string().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'Ricks',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://rickandmortyapi.com/api/character');
        const ricks = await lastValueFrom(request);
        return ricks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
