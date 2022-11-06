import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get('/:id')
  getQuestionById(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.getQuestionById(id);
  }

  @Get('/:id/correct-answer')
  getCorrectAnswer(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.getCorrectAnswer(id);
  }
}
