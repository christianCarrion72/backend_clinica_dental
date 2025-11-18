import { Test, TestingModule } from '@nestjs/testing';
import { EnfermedadsService } from './enfermedads.service';

describe('EnfermedadsService', () => {
  let service: EnfermedadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnfermedadsService],
    }).compile();

    service = module.get<EnfermedadsService>(EnfermedadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
