import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { HorarioFechasService } from './horario_fechas.service';
import { CreateHorarioFechaDto } from './dto/create-horario_fecha.dto';
import { UpdateHorarioFechaDto } from './dto/update-horario_fecha.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('horario-fechas')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('horario-fechas')
export class HorarioFechasController {
  constructor(private readonly horarioFechasService: HorarioFechasService) {}

  @Post()
  async create(@Body() createHorarioFechaDto: CreateHorarioFechaDto) {
    return this.horarioFechasService.create(createHorarioFechaDto);
  }

  @Get()
  async findAll() {
    return this.horarioFechasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.horarioFechasService.findOne(id);
  }

  @Get('fecha/:fecha')
  async findHoraioFecha(@Param('fecha') fecha: string) {
    console.log('Usaste el endpoint de horarios por fecha');
    return this.horarioFechasService.findHoraioFecha(fecha);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateHorarioFechaDto: UpdateHorarioFechaDto) {
    return this.horarioFechasService.update(id, updateHorarioFechaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.horarioFechasService.remove(id);
  }
}
