"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Article_entity_1 = require("../entity/Article.entity");
const typeorm_2 = require("typeorm");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let ArticleService = class ArticleService {
    constructor(articleRepository, http) {
        this.articleRepository = articleRepository;
        this.http = http;
        this.COMMENT_SERVICE_URL = 'http://localhost:3001';
    }
    create(createArticleDto) {
        return this.articleRepository.save(this.articleRepository.create(createArticleDto));
    }
    findAll() {
        return this.articleRepository.find();
    }
    update(id, data) {
        return this.articleRepository
            .createQueryBuilder()
            .update()
            .set({
            article: data.article,
        })
            .where('id = :id', { id })
            .execute();
    }
    delete(id) {
        return this.articleRepository
            .createQueryBuilder()
            .delete()
            .from(Article_entity_1.Article)
            .where('id = :id', { id })
            .execute();
    }
    findAllByuserId(userId) {
        return this.articleRepository.find({
            where: {
                userId: userId
            }
        });
    }
    async findUserByIdWithArticles(id) {
        let article = await this.articleRepository.findOne({ where: { id: id } });
        if (article == null) {
            return 'articles not found';
        }
        return this.getCommentsByArticleIdAndBindToArticle(id, article);
    }
    async getCommentsByArticleIdAndBindToArticle(articleId, article) {
        return this.http
            .get(this.COMMENT_SERVICE_URL + '/comments/article/' + articleId)
            .pipe((0, rxjs_1.map)((res) => {
            return {
                'article': article,
                'comments': res.data
            };
        }))
            .pipe((0, rxjs_1.catchError)((e) => {
            throw new common_1.ForbiddenException(e);
        }));
    }
};
__decorate([
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.CacheTTL)(10),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleService.prototype, "findAll", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.CacheTTL)(10),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleService.prototype, "findAllByuserId", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.CacheTTL)(10),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleService.prototype, "findUserByIdWithArticles", null);
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Article_entity_1.Article)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map