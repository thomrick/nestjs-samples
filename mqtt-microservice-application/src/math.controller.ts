import { Controller } from '@nestjs/common';

@Controller()
export class MathController {
  public sum(data: number[]): number {
    return data.reduce((a, b) => a + b);
  }
}
