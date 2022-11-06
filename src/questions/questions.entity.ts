import { Answer } from 'src/answers/answers.entity';
import { Quiz } from 'src/quizzes/quizzes.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @Column()
  title: string;

  @Column()
  img: string;

  @OneToOne(() => Answer, (answer) => answer.question)
  @JoinColumn({ name: 'correct_answer_id' })
  correctAnswer: Answer;

  @OneToMany(() => Answer, (answers) => answers.question)
  answers: Answer[];
}
