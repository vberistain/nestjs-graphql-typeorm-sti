import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './content/content.module';
import { MovieModule } from './content/movie/movie.module';
// import { Content } from './content/entities/content.entity';

@Module({
    imports: [
        MikroOrmModule.forRoot(),
        GraphQLModule.forRoot({
            include: [ContentModule, MovieModule],
            autoSchemaFile: true,
        }),
        ContentModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
