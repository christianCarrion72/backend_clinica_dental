import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('horarios')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  @Post()
  async create(@Body() createHorarioDto: CreateHorarioDto) {
    return await this.horariosService.create(createHorarioDto);
  }

  @Get()
  async findAll() {
    return await this.horariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.horariosService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateHorarioDto: UpdateHorarioDto) {
    return await this.horariosService.update(id, updateHorarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.horariosService.remove(id);
  }
}
