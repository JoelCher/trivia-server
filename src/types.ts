import { Question } from './questions/questions.entity';

export type newQuizParams = {
  title: string;
  description: string;
  img: string;
  questions: Question[];
};
