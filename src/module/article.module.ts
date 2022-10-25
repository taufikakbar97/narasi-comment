import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entity/Article.entity';
import { ArticleController } from '../controller/article.controller';
import { ArticleService } from '../service/article.service';
@Module({
  imports: [TypeOrmModule.forFeature([Article]), HttpModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}