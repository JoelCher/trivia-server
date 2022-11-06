import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answers/answers.entity';
import { AnswersModule } from 'src/answers/answers.module';
import { AnswersService } from 'src/answers/answers.service';
import { QuestionsController } from './questions.controller';
import { Question } from './questions.entity';
import { QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer]), AnswersModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
