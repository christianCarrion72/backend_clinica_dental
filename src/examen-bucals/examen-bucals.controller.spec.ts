import { Test, TestingModule } from '@nestjs/testing';
import { ExamenBucalsController } from './examen-bucals.controller';
import { ExamenBucalsService } from './examen-bucals.service';

describe('ExamenBucalsController', () => {
  let controller: ExamenBucalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamenBucalsController],
      providers: [ExamenBucalsService],
    }).compile();

    controller = module.get<ExamenBucalsController>(ExamenBucalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
