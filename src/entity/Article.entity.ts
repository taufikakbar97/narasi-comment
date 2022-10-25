import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({type: 'varchar', nullable: true, name: 'user_id'})
  userId: string;
 
  @Column({ type: 'varchar', nullable: true, name: 'article'})
  article: string;
}