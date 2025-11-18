import { Test, TestingModule } from '@nestjs/testing';
import { PlanTratamientosController } from './plan-tratamientos.controller';
import { PlanTratamientosService } from './plan-tratamientos.service';

describe('PlanTratamientosController', () => {
  let controller: PlanTratamientosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanTratamientosController],
      providers: [PlanTratamientosService],
    }).compile();

    controller = module.get<PlanTratamientosController>(PlanTratamientosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
