import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistorialMedicosService } from './historial-medicos.service';
import { CreateHistorialMedicoDto } from './dto/create-historial-medico.dto';
import { UpdateHistorialMedicoDto } from './dto/update-historial-medico.dto';

@Controller('historial-medicos')
export class HistorialMedicosController {
  constructor(
    private readonly historialMedicosService: HistorialMedicosService,
  ) {}

  @Post()
  create(@Body() createHistorialMedicoDto: CreateHistorialMedicoDto) {
    return this.historialMedicosService.create(createHistorialMedicoDto);
  }

  @Get()
  findAll() {
    return this.historialMedicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialMedicosService.findOne(+id);
  }

  @Get('historia-clinica/:historiaClinicaId')
  findByHistoriaClinicaId(
    @Param('historiaClinicaId') historiaClinicaId: string,
  ) {
    return this.historialMedicosService.findByHistoriaClinicaId(
      +historiaClinicaId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistorialMedicoDto: UpdateHistorialMedicoDto,
  ) {
    return this.historialMedicosService.update(+id, updateHistorialMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialMedicosService.remove(+id);
  }
}
