import { Question } from 'src/questions/questions.entity';

export class AddQuizDto {
  title: string;
  description: string;
  img: string;
  questions: Question[];
}
