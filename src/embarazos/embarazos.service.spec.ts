import { Test, TestingModule } from '@nestjs/testing';
import { EmbarazosService } from './embarazos.service';

describe('EmbarazosService', () => {
  let service: EmbarazosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmbarazosService],
    }).compile();

    service = module.get<EmbarazosService>(EmbarazosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
