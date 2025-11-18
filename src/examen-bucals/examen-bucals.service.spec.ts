import { Test, TestingModule } from '@nestjs/testing';
import { ExamenBucalsService } from './examen-bucals.service';

describe('ExamenBucalsService', () => {
  let service: ExamenBucalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamenBucalsService],
    }).compile();

    service = module.get<ExamenBucalsService>(ExamenBucalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
