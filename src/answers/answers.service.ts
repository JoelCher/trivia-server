import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/questions.entity';
import { Repository } from 'typeorm';
import { Answer } from './answers.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer) private answersRepository: Repository<Answer>,
  ) {}

  //called from questions service
  async createAnswer(answer: { text: string; img: string }) {
    const newAnswer = this.answersRepository.create({
      ...answer,
    });
    const savedAnswer = await this.answersRepository.save(newAnswer);

    return savedAnswer;
  }
}
