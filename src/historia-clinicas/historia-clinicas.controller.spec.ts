import { Test, TestingModule } from '@nestjs/testing';
import { HistoriaClinicasController } from './historia-clinicas.controller';
import { HistoriaClinicasService } from './historia-clinicas.service';

describe('HistoriaClinicasController', () => {
  let controller: HistoriaClinicasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoriaClinicasController],
      providers: [HistoriaClinicasService],
    }).compile();

    controller = module.get<HistoriaClinicasController>(HistoriaClinicasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
