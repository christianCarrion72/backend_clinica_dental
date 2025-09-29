import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoCivilsService } from './estado_civils.service';
import { CreateEstadoCivilDto } from './dto/create-estado_civil.dto';
import { UpdateEstadoCivilDto } from './dto/update-estado_civil.dto';

@Controller('estado-civils')
export class EstadoCivilsController {
  constructor(private readonly estadoCivilsService: EstadoCivilsService) {}

  @Post()
  create(@Body() createEstadoCivilDto: CreateEstadoCivilDto) {
    return this.estadoCivilsService.create(createEstadoCivilDto);
  }

  @Get()
  findAll() {
    return this.estadoCivilsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoCivilsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoCivilDto: UpdateEstadoCivilDto) {
    return this.estadoCivilsService.update(+id, updateEstadoCivilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoCivilsService.remove(+id);
  }
}
