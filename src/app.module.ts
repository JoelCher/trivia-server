import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ScoresModule } from './scores/scores.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { User } from './users/users.entity';
import { Quiz } from './quizzes/quizzes.entity';
import { Score } from './scores/scores.entity';
import { Answer } from './answers/answers.entity';
import { Question } from './questions/questions.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'z10mz10m',
      database: 'pj',
      entities: [User, Quiz, Score, Answer, Question],
      synchronize: true,
    }),
    QuizzesModule,
    ScoresModule,
    QuestionsModule,
    AnswersModule,
  ],
})
export class AppModule {}
