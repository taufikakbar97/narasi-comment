import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ArticleModule } from 'src/module/article.module';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.listen(4001)
  .then(() => {
    console.log("article-service successfully stared on port 4001");
  })
  .catch((error) => {
    console.log(error);
  })}
bootstrap();
