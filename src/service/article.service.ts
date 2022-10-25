import { Injectable, CacheInterceptor, UseInterceptors, CacheTTL, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleDto } from 'src/dto/CreateArticle.dto';
import { Article } from 'src/entity/Article.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs';

@Injectable()
export class ArticleService {

COMMENT_SERVICE_URL: string = 'http://localhost:3001';

constructor(
  @InjectRepository(Article) private articleRepository: Repository<Article>,
  private http: HttpService,
) {}

create(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleRepository.save(this.articleRepository.create(createArticleDto));
}

@UseInterceptors(CacheInterceptor)
@CacheTTL(10)
findAll(): Promise<Article[]> {
  return this.articleRepository.find();
}
update(id: string, data: any): Promise<any> {
  return this.articleRepository
  .createQueryBuilder()
  .update()
  .set({
    article: data.article,
  })
  .where('id = :id', { id })
  .execute()
}
delete(id: string): Promise<any> {
  return this.articleRepository
  .createQueryBuilder()
  .delete()
  .from(Article)
  .where('id = :id', { id })
  .execute()
}

@UseInterceptors(CacheInterceptor)
@CacheTTL(10)
findAllByuserId (userId: string): Promise<Article[]> {
  return this.articleRepository.find({
    where: {
      userId: userId
    }
  })
}

@UseInterceptors(CacheInterceptor)
@CacheTTL(10)
async findUserByIdWithArticles (id: number) {
  let article = await this.articleRepository.findOne({where: {id: id}});
  if (article == null) {
    return 'articles not found'
  }
  return this.getCommentsByArticleIdAndBindToArticle(id, article)
}

async getCommentsByArticleIdAndBindToArticle(articleId: number, article: Article) {
  return this.http
    .get(this.COMMENT_SERVICE_URL + '/comments/article/' + articleId)
    .pipe(
      map((res) => {
          return {
            'article': article,
            'comments': res.data
          };
      }),
    )
    .pipe(
      catchError((e) => {
        throw new ForbiddenException(e);
      }),
    );
}


}