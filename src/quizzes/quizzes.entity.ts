import { Question } from 'src/questions/questions.entity';
import { Score } from 'src/scores/scores.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.quizzes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  img: string;

  @OneToMany(() => Question, (questions) => questions.quiz)
  questions: Question[];

  @OneToMany(() => Score, (scores) => scores.quiz)
  scores: Score[] | null;
}
