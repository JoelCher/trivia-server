import { Quiz } from 'src/quizzes/quizzes.entity';
import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Quiz, (quiz) => quiz.user)
  @JoinColumn()
  quizzes: Quiz[];
}
