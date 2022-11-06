import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/answers/answers.entity';
import { AnswersService } from 'src/answers/answers.service';
import { Quiz } from 'src/quizzes/quizzes.entity';
import { Repository } from 'typeorm';
import { Question } from './questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    private answersService: AnswersService,
  ) {}

  async getQuestionById(id: number) {
    const question = await this.questionsRepository.findOne({
      where: { id },
      relations: ['answers'],
    });

    return question;
  }

  // function that adds a question --called from the quiz service
  async addQuestion(newQuiz: Quiz, question: Partial<questionParams>) {
    const newQuestion = this.questionsRepository.create({
      quiz: newQuiz,
      title: question.title,
      img: question.img,
    });
    //creates answers for the question
    const newAnswers = await Promise.all(
      question.answers.map((obj) => {
        return this.answersService.createAnswer(obj);
      }),
    );

    const savedQuestion = await this.questionsRepository.save({
      title: newQuestion.title,
      img: newQuestion.img,
      correctAnswer: newAnswers[question.correctAnswerIndex],
      answers: newAnswers,
    });

    return savedQuestion;
  }

  async getCorrectAnswer(questionId: number) {
    const question = await this.questionsRepository.findOne({
      where: { id: questionId },
      relations: ['correctAnswer'],
    });
    return question.correctAnswer;
  }
}
