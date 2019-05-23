import { Module } from '@nestjs/common';
import { HeroesController } from './hero.controller';

@Module({
  controllers: [
    HeroesController,
  ],
})
export class HeroesModule {}
