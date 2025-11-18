import { Test, TestingModule } from '@nestjs/testing';
import { EmbarazosController } from './embarazos.controller';
import { EmbarazosService } from './embarazos.service';

describe('EmbarazosController', () => {
  let controller: EmbarazosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmbarazosController],
      providers: [EmbarazosService],
    }).compile();

    controller = module.get<EmbarazosController>(EmbarazosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
