import { IsNotEmpty, MinLength } from "class-validator";

export class CreateArticleDto {
    @IsNotEmpty()
    @MinLength(3)
    userId: string;

    @IsNotEmpty()
    @MinLength(8)
    article: string;
}