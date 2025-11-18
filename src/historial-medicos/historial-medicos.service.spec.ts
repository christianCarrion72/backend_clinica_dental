import { Test, TestingModule } from '@nestjs/testing';
import { HistorialMedicosService } from './historial-medicos.service';

describe('HistorialMedicosService', () => {
  let service: HistorialMedicosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialMedicosService],
    }).compile();

    service = module.get<HistorialMedicosService>(HistorialMedicosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
