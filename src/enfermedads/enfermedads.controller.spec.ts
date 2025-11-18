import { Test, TestingModule } from '@nestjs/testing';
import { EnfermedadsController } from './enfermedads.controller';
import { EnfermedadsService } from './enfermedads.service';

describe('EnfermedadsController', () => {
  let controller: EnfermedadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnfermedadsController],
      providers: [EnfermedadsService],
    }).compile();

    controller = module.get<EnfermedadsController>(EnfermedadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
