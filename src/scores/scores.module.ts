import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './scores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  providers: [ScoresService],
  controllers: [ScoresController],
})
export class ScoresModule {}
