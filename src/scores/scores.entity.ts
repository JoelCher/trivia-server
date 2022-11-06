import { Quiz } from 'src/quizzes/quizzes.entity';
import { text } from 'stream/consumers';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.scores)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @Column()
  score: number;

  @Column({ type: 'text' })
  date: string;
}
