import { Test, TestingModule } from '@nestjs/testing';
import { HistoriaClinicasService } from './historia-clinicas.service';

describe('HistoriaClinicasService', () => {
  let service: HistoriaClinicasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoriaClinicasService],
    }).compile();

    service = module.get<HistoriaClinicasService>(HistoriaClinicasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
