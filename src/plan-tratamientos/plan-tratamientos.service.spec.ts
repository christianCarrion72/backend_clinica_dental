import { Test, TestingModule } from '@nestjs/testing';
import { PlanTratamientosService } from './plan-tratamientos.service';

describe('PlanTratamientosService', () => {
  let service: PlanTratamientosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanTratamientosService],
    }).compile();

    service = module.get<PlanTratamientosService>(PlanTratamientosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
