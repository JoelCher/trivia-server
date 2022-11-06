import { Question } from 'src/questions/questions.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  question: Question;
  // @Column({ name: 'question_id' })
  // questionId: number;
  @Column({ type: 'text' })
  text: string;

  // @OneToOne(() => Question, (relatedQuestion) => relatedQuestion.correctAnswer)
  // relatedQuestion: Question;

  @Column()
  img: string;
}
