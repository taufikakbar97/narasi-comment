import { Body, Controller, Delete, Get, Param, Post, Put, Req, ParseIntPipe } from '@nestjs/common';
import { Request } from 'express';
import { ArticleService } from 'src/service/article.service';
import { Article } from 'src/entity/Article.entity';
import { CreateArticleDto } from 'src/dto/CreateArticle.dto';

@Controller('articles')
export class ArticleController {

constructor(private articleService: ArticleService) {}

@Post()
async create(@Body() createArticleDto: CreateArticleDto) {
  const todo = await this.articleService.create(createArticleDto);
  console.log(todo)
  if(!todo) {
    return 'error in creating article'
  }
  return 'article created successfully'
}

@Get()
async findAll(@Req() request: Request) {
  const articles: Array<Article> = await this.articleService.findAll()
  return articles
}

@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return await this.articleService.findUserByIdWithArticles(id)
}

@Put(':id')
async update(@Param('id') id: string, @Body() body: any) {
  const newArticle: any = await this.articleService.update(id, body)
  return "article updated";
}

@Delete(':id')
async remove(@Param('id') id: string) {
  await this.articleService.delete(id)
  return "article deleted"
}

@Get('user/:userId')
async findAllByUserid(@Param('userId') userId: string) {
  const articles: Array<Article> = await this.articleService.findAllByuserId(userId)
  return articles
}

}