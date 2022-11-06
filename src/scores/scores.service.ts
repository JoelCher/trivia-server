import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './scores.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score) private scoresRepository: Repository<Score>,
  ) {}
}
