import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import Path = require('path');
import { randomUUID } from 'crypto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddQuizDto } from './dtos/addQuiz.dto';
import { QuizzesService } from './quizzes.service';
const storage = {
  storage: diskStorage({
    destination: 'src/uploads/files',
    filename: (req, file, cb) => {
      const filename: string = 'myfile-' + randomUUID();
      const extension: string = Path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};
@Controller('quizzes')
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @Get('/details')
  getAllQuizzesDetails() {
    return this.quizzesService.getAllQuizzesDetails();
  }
  @Get()
  async getAllQuizzes() {
    console.log('yo im here');

    const quizzes = await this.quizzesService.getAllQuizzes();
    return quizzes;
  }

  @Get('/:id')
  async getQuizByTitle(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.getQuizById(id);
  }

  //testing file uploads
  @Post('/file')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    console.log(JSON.parse(body.quiz).title);

    return file;
  }

  @Delete('/:id')
  async deleteQuizById(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.deleteQuizById(id);
  }

  @Post('/:userId')
  async addQuiz(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() addQuizDto: AddQuizDto,
  ) {
    return this.quizzesService.addQuiz(userId, addQuizDto);
  }

  @Get('/:id/questions')
  async getQuestionsByQuizId(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.getQuestionsByQuizId(id);
  }

  @Get('/:id/scores')
  getScoresByQuizTitle(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.getScoresByQuizId(id);
  }
}
