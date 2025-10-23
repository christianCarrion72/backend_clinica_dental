import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('citas')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  async create(@Body() createCitaDto: CreateCitaDto) {
    return this.citasService.create(createCitaDto);
  }

  @Get()
  async findAll() {
    return this.citasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.citasService.findOne(id);
  }

  @Get('dentista/:id')
  async findForDentist(@Param('id_dentist') id: number){
    return this.citasService.findForDentist(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citasService.update(id, updateCitaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.citasService.remove(id);
  }
}
