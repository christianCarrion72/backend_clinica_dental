import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamenBucalsService } from './examen-bucals.service';
import { CreateExamenBucalDto } from './dto/create-examen-bucal.dto';
import { UpdateExamenBucalDto } from './dto/update-examen-bucal.dto';

@Controller('examen-bucals')
export class ExamenBucalsController {
  constructor(private readonly examenBucalsService: ExamenBucalsService) {}

  @Post()
  create(@Body() createExamenBucalDto: CreateExamenBucalDto) {
    return this.examenBucalsService.create(createExamenBucalDto);
  }

  @Get()
  findAll() {
    return this.examenBucalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examenBucalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamenBucalDto: UpdateExamenBucalDto) {
    return this.examenBucalsService.update(+id, updateExamenBucalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examenBucalsService.remove(+id);
  }
}
