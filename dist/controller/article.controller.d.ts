import { Request } from 'express';
import { ArticleService } from 'src/service/article.service';
import { Article } from 'src/entity/Article.entity';
import { CreateArticleDto } from 'src/dto/CreateArticle.dto';
export declare class ArticleController {
    private articleService;
    constructor(articleService: ArticleService);
    create(createArticleDto: CreateArticleDto): Promise<"error in creating article" | "article created successfully">;
    findAll(request: Request): Promise<Article[]>;
    findOne(id: number): Promise<"articles not found" | import("rxjs").Observable<{
        article: Article;
        comments: any;
    }>>;
    update(id: string, body: any): Promise<string>;
    remove(id: string): Promise<string>;
    findAllByUserid(userId: string): Promise<Article[]>;
}
