import { Module } from '@nestjs/common';
import { HeroesModule } from './hero';

@Module({
  imports: [
    HeroesModule,
  ],
})
export class ClientModule {}
