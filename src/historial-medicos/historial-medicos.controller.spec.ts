import { Test, TestingModule } from '@nestjs/testing';
import { HistorialMedicosController } from './historial-medicos.controller';
import { HistorialMedicosService } from './historial-medicos.service';

describe('HistorialMedicosController', () => {
  let controller: HistorialMedicosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialMedicosController],
      providers: [HistorialMedicosService],
    }).compile();

    controller = module.get<HistorialMedicosController>(HistorialMedicosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
