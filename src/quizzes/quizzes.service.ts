import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsService } from 'src/questions/questions.service';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { newQuizParams } from 'src/types';
import { Quiz } from './quizzes.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz) private quizzesRepository: Repository<Quiz>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private questionsService: QuestionsService,
  ) {}

  getAllQuizzes() {
    return this.quizzesRepository.find();
  }

  async getQuizById(id: number) {
    const quiz = this.quizzesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!quiz)
      throw new HttpException('quiz not found ', HttpStatus.BAD_REQUEST);
    else return quiz;
  }

  deleteQuizById(id: number) {
    return this.quizzesRepository.delete({ id });
  }

  async addQuiz(userId: number, quizDetails: newQuizParams) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    //creates basic details on the quiz
    const newQuiz = this.quizzesRepository.create({
      user: user,
      title: quizDetails.title,
      img: quizDetails.img,
      description: quizDetails.description,
    });

    //creates the questions of the quiz
    const newQuestions = await Promise.all(
      quizDetails.questions.map((obj) =>
        this.questionsService.addQuestion(newQuiz, obj),
      ),
    );

    const quiz = await this.quizzesRepository.save({
      ...newQuiz,
      questions: newQuestions,
    });
    return quiz;
  }

  async getQuestionsByQuizId(id: number) {
    const quizzes = await this.quizzesRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
    return quizzes.questions;
  }

  async getScoresByQuizId(id: number) {
    const quiz = await this.quizzesRepository.findOne({
      where: { id },
      relations: ['scores'],
    });

    return quiz.scores;
  }

  async getAllQuizzesDetails() {
    const quizzes = await this.getAllQuizzes();
    return quizzes.map((obj) => {
      return {
        title: obj.title,
        id: obj.id,
        description: obj.description,
        img: obj.img,
      };
    });
  }
}
