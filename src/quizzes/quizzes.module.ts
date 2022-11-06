import { UserModule } from '@hilma/auth-nest';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answers/answers.entity';
import { Question } from 'src/questions/questions.entity';
import { QuestionsModule } from 'src/questions/questions.module';
import { QuestionsService } from 'src/questions/questions.service';
import { User } from 'src/users/users.entity';
import { QuizzesController } from './quizzes.controller';
import { Quiz } from './quizzes.entity';
import { QuizzesService } from './quizzes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, User, Question, Answer]),
    QuestionsModule,
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
