import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoriaClinicasService } from './historia-clinicas.service';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';

@Controller('historia-clinicas')
export class HistoriaClinicasController {
  constructor(
    private readonly historiaClinicasService: HistoriaClinicasService,
  ) {}

  @Post()
  create(@Body() createHistoriaClinicaDto: CreateHistoriaClinicaDto) {
    return this.historiaClinicasService.create(createHistoriaClinicaDto);
  }

  @Get()
  findAll() {
    return this.historiaClinicasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historiaClinicasService.findOne(+id);
  }

  @Get('paciente/:pacienteId')
  findByPacienteId(@Param('pacienteId') pacienteId: string) {
    return this.historiaClinicasService.findByPacienteId(+pacienteId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistoriaClinicaDto: UpdateHistoriaClinicaDto,
  ) {
    return this.historiaClinicasService.update(+id, updateHistoriaClinicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiaClinicasService.remove(+id);
  }
}
