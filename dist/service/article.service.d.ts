import { CreateArticleDto } from 'src/dto/CreateArticle.dto';
import { Article } from 'src/entity/Article.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
export declare class ArticleService {
    private articleRepository;
    private http;
    COMMENT_SERVICE_URL: string;
    constructor(articleRepository: Repository<Article>, http: HttpService);
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    findAll(): Promise<Article[]>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<any>;
    findAllByuserId(userId: string): Promise<Article[]>;
    findUserByIdWithArticles(id: number): Promise<"articles not found" | import("rxjs").Observable<{
        article: Article;
        comments: any;
    }>>;
    getCommentsByArticleIdAndBindToArticle(articleId: number, article: Article): Promise<import("rxjs").Observable<{
        article: Article;
        comments: any;
    }>>;
}
