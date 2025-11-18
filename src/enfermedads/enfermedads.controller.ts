import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnfermedadsService } from './enfermedads.service';
import { CreateEnfermedadDto } from './dto/create-enfermedad.dto';
import { UpdateEnfermedadDto } from './dto/update-enfermedad.dto';

@Controller('enfermedads')
export class EnfermedadsController {
  constructor(private readonly enfermedadsService: EnfermedadsService) {}

  @Post()
  create(@Body() createEnfermedadDto: CreateEnfermedadDto) {
    return this.enfermedadsService.create(createEnfermedadDto);
  }

  @Get()
  findAll() {
    return this.enfermedadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enfermedadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnfermedadDto: UpdateEnfermedadDto) {
    return this.enfermedadsService.update(+id, updateEnfermedadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enfermedadsService.remove(+id);
  }
}
