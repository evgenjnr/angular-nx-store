import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log(__dirname);
        return {
          type: 'postgres' as 'aurora-mysql',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get<string>('DB_USER_PASSWORD'),
          database: configService.get('DB_NAME') as string,
          autoLoadEntities: true,
          entities: [__dirname + '/**/*.entity{.js,.ts}'],
          dropSchema: false,
          logging: true,
          migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
          synchronize: true,
          cli: {
            migrationsDir: __dirname + '/migrations/',
          },
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {
  constructor(private readonly db: DataSource) {
    console.log({ DB: this.db.options });
  }
}
